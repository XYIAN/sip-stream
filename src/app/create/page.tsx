'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { PlayerList } from '../../../components/player-list';
import { GameTypeSelector } from '../../../components/game-type-selector';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';

export default function CreateGamePage() {
  const [gameType, setGameType] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { supabase, session } = useAuth();
  const router = useRouter();

  async function createGame() {
    if (!supabase || !session?.user) return;
    if (!gameType) {
      setError('Please select a game type');
      return;
    }
    if (players.length < 2) {
      setError('Please add at least 2 players');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('games')
        .insert({
          game_type: gameType as 'kings-cup' | 'never-have-i-ever' | 'custom-deck',
          players,
          current_drinks: 0,
          current_player_index: 0,
          is_active: true,
          created_by: session.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      router.push(`/${data.id}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-orange-900 to-red-700 text-white">
      <div className="absolute top-4 left-4">
        <Link href="/" passHref legacyBehavior>
          <Button icon="pi pi-arrow-left" className="p-button-text p-button-rounded" />
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Create a New Game</h1>

      <div className="w-full max-w-md bg-orange-800 rounded-lg p-6 space-y-6">
        {error && <Message severity="error" text={error} className="w-full" />}

        <div>
          <h3 className="text-lg font-semibold mb-3">Game Type</h3>
          <GameTypeSelector value={gameType} onChange={setGameType} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Players</h3>
          <PlayerList players={players} onPlayersChange={setPlayers} />
        </div>

        <Button
          label="Create Game"
          onClick={createGame}
          loading={loading}
          disabled={!gameType || players.length < 2}
          className="w-full p-button-lg"
        />
      </div>
    </main>
  );
}
