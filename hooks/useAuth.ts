import { useSupabase } from '../lib/providers/supabase-provider';

export function useAuth() {
  const { session, setSession, supabase } = useSupabase();
  // TODO: implement login, signup, logout
  return {
    session,
    setSession,
    supabase,
  };
}
