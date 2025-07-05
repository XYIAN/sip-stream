'use client';

import { useParams } from 'next/navigation';
import { useGame } from '../../../hooks/useGame';
import { GameHistory } from '../../../components/game-history';

export default function GameHistoryPage() {
  const params = useParams();
  const gameId = params.gameid as string;
  const { game, isLoading, error } = useGame(gameId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 to-red-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading game history...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 to-red-900 flex items-center justify-center">
        <div className="text-white text-xl">Error loading game history</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 to-red-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Game History - {game.id}</h1>
        <GameHistory />
      </div>
    </div>
  );
}
