'use client';

import { useParams } from 'next/navigation';
import { useGame } from '../../../../hooks/useGame';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import Link from 'next/link';

export default function GameHistoryPage() {
  const params = useParams();
  const gameId = params.gameid as string;
  const { game, history, isLoading, error } = useGame(gameId);

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-orange-900 to-red-700 text-white">
        <ProgressSpinner />
        <p className="mt-4">Loading history...</p>
      </main>
    );
  }

  if (error || !game) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-orange-900 to-red-700 text-white">
        <Message severity="error" text={error || 'Game not found'} className="w-full max-w-md" />
        <Link href="/" passHref legacyBehavior>
          <Button label="Go Home" className="mt-4" />
        </Link>
      </main>
    );
  }

  function formatAction(action: string) {
    switch (action) {
      case 'drink_taken':
        return '🍺 Drink taken';
      case 'next_turn':
        return '🔄 Turn changed';
      case 'card_drawn':
        return '🎴 Card drawn';
      case 'drinks_added':
        return '➕ Drinks added';
      default:
        return action;
    }
  }

  function formatTime(timestamp: string) {
    return new Date(timestamp).toLocaleTimeString();
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-orange-900 to-red-700 text-white">
      <div className="absolute top-4 left-4">
        <Link href={`/${gameId}/dashboard`} passHref legacyBehavior>
          <Button icon="pi pi-arrow-left" className="p-button-text p-button-rounded" />
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Game History</h1>

      <div className="w-full max-w-2xl space-y-4">
        {history.length === 0 ? (
          <Card className="bg-orange-800 border-orange-600">
            <div className="text-center text-orange-200">
              <p>No history yet. Start playing to see events here!</p>
            </div>
          </Card>
        ) : (
          history.map(entry => (
            <Card key={entry.id} className="bg-orange-800 border-orange-600">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-white">{formatAction(entry.action)}</h3>
                  <p className="text-orange-200 text-sm">{entry.player}</p>
                  {entry.details && (
                    <p className="text-orange-300 text-xs mt-1">{JSON.stringify(entry.details)}</p>
                  )}
                </div>
                <div className="text-orange-300 text-xs">{formatTime(entry.created_at)}</div>
              </div>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
