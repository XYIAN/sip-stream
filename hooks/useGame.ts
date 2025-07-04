import { useEffect } from 'react';

export function useGame(gameId: string) {
  // TODO: implement fetching, subscribing, and updating game state
  useEffect(() => {
    // subscribe to Supabase realtime here
  }, [gameId]);

  return {
    game: null,
    isLoading: true,
    error: null,
    updateGame: () => {},
  };
}
