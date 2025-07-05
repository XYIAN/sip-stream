-- SipStream Database Setup for Supabase
-- Run this in your Supabase SQL Editor

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'in_game', 'away')),
  current_game_id UUID REFERENCES games(id),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create friends table
CREATE TABLE IF NOT EXISTS friends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  friend_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, friend_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('friend_request', 'game_invite', 'game_update', 'friend_joined_game')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  requires_action BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create game_invitations table
CREATE TABLE IF NOT EXISTS game_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID REFERENCES games(id) NOT NULL,
  inviter_id UUID REFERENCES auth.users(id) NOT NULL,
  invitee_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + interval '1 hour'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  game_type TEXT NOT NULL CHECK (game_type IN ('kings-cup', 'never-have-i-ever', 'custom-deck')),
  players TEXT[] NOT NULL,
  current_drinks INTEGER DEFAULT 0 NOT NULL,
  current_player_index INTEGER DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_by UUID REFERENCES auth.users(id) NOT NULL
);

-- Create game_history table
CREATE TABLE IF NOT EXISTS game_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  player TEXT NOT NULL,
  details JSONB
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "User profiles are viewable by everyone" ON user_profiles;
DROP POLICY IF EXISTS "User profiles can be updated by owner" ON user_profiles;
DROP POLICY IF EXISTS "User profiles can be created by authenticated users" ON user_profiles;

DROP POLICY IF EXISTS "Friends are viewable by participants" ON friends;
DROP POLICY IF EXISTS "Friends can be created by authenticated users" ON friends;
DROP POLICY IF EXISTS "Friends can be updated by participants" ON friends;

DROP POLICY IF EXISTS "Notifications are viewable by owner" ON notifications;
DROP POLICY IF EXISTS "Notifications can be created by authenticated users" ON notifications;
DROP POLICY IF EXISTS "Notifications can be updated by owner" ON notifications;

DROP POLICY IF EXISTS "Game invitations are viewable by participants" ON game_invitations;
DROP POLICY IF EXISTS "Game invitations can be created by authenticated users" ON game_invitations;
DROP POLICY IF EXISTS "Game invitations can be updated by participants" ON game_invitations;

DROP POLICY IF EXISTS "Games are viewable by everyone" ON games;
DROP POLICY IF EXISTS "Games can be created by authenticated users" ON games;
DROP POLICY IF EXISTS "Games can be updated by authenticated users" ON games;

DROP POLICY IF EXISTS "History is viewable by everyone" ON game_history;
DROP POLICY IF EXISTS "History can be created by authenticated users" ON game_history;

-- Create policies for user_profiles table
CREATE POLICY "User profiles are viewable by everyone" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "User profiles can be updated by owner" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "User profiles can be created by authenticated users" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for friends table
CREATE POLICY "Friends are viewable by participants" ON friends FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "Friends can be created by authenticated users" ON friends FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Friends can be updated by participants" ON friends FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Create policies for notifications table
CREATE POLICY "Notifications are viewable by owner" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Notifications can be created by authenticated users" ON notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Notifications can be updated by owner" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for game_invitations table
CREATE POLICY "Game invitations are viewable by participants" ON game_invitations FOR SELECT USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);
CREATE POLICY "Game invitations can be created by authenticated users" ON game_invitations FOR INSERT WITH CHECK (auth.uid() = inviter_id);
CREATE POLICY "Game invitations can be updated by participants" ON game_invitations FOR UPDATE USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);

-- Create policies for games table
CREATE POLICY "Games are viewable by everyone" ON games FOR SELECT USING (true);
CREATE POLICY "Games can be created by authenticated users" ON games FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Games can be updated by authenticated users" ON games FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policies for game_history table
CREATE POLICY "History is viewable by everyone" ON game_history FOR SELECT USING (true);
CREATE POLICY "History can be created by authenticated users" ON game_history FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE user_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE friends;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE game_invitations;
ALTER PUBLICATION supabase_realtime ADD TABLE games;
ALTER PUBLICATION supabase_realtime ADD TABLE game_history;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles(status);
CREATE INDEX IF NOT EXISTS idx_friends_user_id ON friends(user_id);
CREATE INDEX IF NOT EXISTS idx_friends_friend_id ON friends(friend_id);
CREATE INDEX IF NOT EXISTS idx_friends_status ON friends(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_game_invitations_invitee_id ON game_invitations(invitee_id);
CREATE INDEX IF NOT EXISTS idx_game_invitations_status ON game_invitations(status);
CREATE INDEX IF NOT EXISTS idx_games_created_by ON games(created_by);
CREATE INDEX IF NOT EXISTS idx_games_is_active ON games(is_active);
CREATE INDEX IF NOT EXISTS idx_game_history_game_id ON game_history(game_id);
CREATE INDEX IF NOT EXISTS idx_game_history_created_at ON game_history(created_at DESC);

-- Grant necessary permissions
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON friends TO authenticated;
GRANT ALL ON notifications TO authenticated;
GRANT ALL ON game_invitations TO authenticated;
GRANT ALL ON games TO authenticated;
GRANT ALL ON game_history TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Create function to update user status when joining/leaving games
CREATE OR REPLACE FUNCTION update_user_game_status()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- User joined a game
    UPDATE user_profiles 
    SET status = 'in_game', current_game_id = NEW.id, updated_at = NOW()
    WHERE id = NEW.created_by;
  ELSIF TG_OP = 'UPDATE' AND NEW.is_active = false AND OLD.is_active = true THEN
    -- Game ended, update all players
    UPDATE user_profiles 
    SET status = 'online', current_game_id = NULL, updated_at = NOW()
    WHERE current_game_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for game status updates
DROP TRIGGER IF EXISTS trigger_update_user_game_status ON games;
CREATE TRIGGER trigger_update_user_game_status
  AFTER INSERT OR UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION update_user_game_status();

-- Create function to handle friend requests
CREATE OR REPLACE FUNCTION handle_friend_request()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    -- Create notification for friend request
    INSERT INTO notifications (user_id, type, title, message, data, requires_action)
    VALUES (
      NEW.friend_id,
      'friend_request',
      'New Friend Request',
      'You have a new friend request',
      jsonb_build_object('friend_id', NEW.user_id, 'request_id', NEW.id),
      true
    );
  ELSIF TG_OP = 'UPDATE' AND NEW.status = 'accepted' AND OLD.status = 'pending' THEN
    -- Friend request accepted, notify the requester
    INSERT INTO notifications (user_id, type, title, message, data)
    VALUES (
      NEW.user_id,
      'friend_request',
      'Friend Request Accepted',
      'Your friend request was accepted!',
      jsonb_build_object('friend_id', NEW.friend_id)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for friend requests
DROP TRIGGER IF EXISTS trigger_handle_friend_request ON friends;
CREATE TRIGGER trigger_handle_friend_request
  AFTER INSERT OR UPDATE ON friends
  FOR EACH ROW
  EXECUTE FUNCTION handle_friend_request();

-- Create function to handle game invitations
CREATE OR REPLACE FUNCTION handle_game_invitation()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Create notification for game invitation
    INSERT INTO notifications (user_id, type, title, message, data, requires_action)
    VALUES (
      NEW.invitee_id,
      'game_invite',
      'Game Invitation',
      'You have been invited to join a game',
      jsonb_build_object('game_id', NEW.game_id, 'inviter_id', NEW.inviter_id, 'invitation_id', NEW.id),
      true
    );
  ELSIF TG_OP = 'UPDATE' AND NEW.status = 'accepted' AND OLD.status = 'pending' THEN
    -- Game invitation accepted, notify the inviter
    INSERT INTO notifications (user_id, type, title, message, data)
    VALUES (
      NEW.inviter_id,
      'game_invite',
      'Game Invitation Accepted',
      'Your game invitation was accepted!',
      jsonb_build_object('game_id', NEW.game_id, 'invitee_id', NEW.invitee_id)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for game invitations
DROP TRIGGER IF EXISTS trigger_handle_game_invitation ON game_invitations;
CREATE TRIGGER trigger_handle_game_invitation
  AFTER INSERT OR UPDATE ON game_invitations
  FOR EACH ROW
  EXECUTE FUNCTION handle_game_invitation(); 