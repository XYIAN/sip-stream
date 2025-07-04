-- SipStream Database Setup for Supabase
-- Run this in your Supabase SQL Editor

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
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Games are viewable by everyone" ON games;
DROP POLICY IF EXISTS "Games can be created by authenticated users" ON games;
DROP POLICY IF EXISTS "Games can be updated by authenticated users" ON games;
DROP POLICY IF EXISTS "History is viewable by everyone" ON game_history;
DROP POLICY IF EXISTS "History can be created by authenticated users" ON game_history;

-- Create policies for games table
CREATE POLICY "Games are viewable by everyone" ON games FOR SELECT USING (true);
CREATE POLICY "Games can be created by authenticated users" ON games FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Games can be updated by authenticated users" ON games FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policies for game_history table
CREATE POLICY "History is viewable by everyone" ON game_history FOR SELECT USING (true);
CREATE POLICY "History can be created by authenticated users" ON game_history FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE games;
ALTER PUBLICATION supabase_realtime ADD TABLE game_history;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_games_created_by ON games(created_by);
CREATE INDEX IF NOT EXISTS idx_games_is_active ON games(is_active);
CREATE INDEX IF NOT EXISTS idx_game_history_game_id ON game_history(game_id);
CREATE INDEX IF NOT EXISTS idx_game_history_created_at ON game_history(created_at DESC);

-- Grant necessary permissions
GRANT ALL ON games TO authenticated;
GRANT ALL ON game_history TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated; 