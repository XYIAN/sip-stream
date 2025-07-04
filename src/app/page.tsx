'use client';

import Link from 'next/link';
import { Button } from 'primereact/button';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { session } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-orange-900 to-red-700 text-white">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-orange-900 to-red-700 text-white">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">SipStream</h1>
        <p className="text-lg mb-6">Play drinking games with friends, anywhere, in real time!</p>

        {session ? (
          <div className="space-y-4">
            <Link href="/create" passHref legacyBehavior>
              <Button
                label="Create New Game"
                className="p-button-lg p-button-rounded bg-orange-600 border-none hover:bg-orange-700"
                icon="pi pi-plus"
              />
            </Link>
            <div className="text-sm text-orange-200">Signed in as: {session.user.email}</div>
          </div>
        ) : (
          <Link href="/login" passHref legacyBehavior>
            <Button
              label="Start or Join a Game"
              className="p-button-lg p-button-rounded bg-orange-600 border-none hover:bg-orange-700"
              icon="pi pi-play"
            />
          </Link>
        )}
      </section>
      <section className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Popular Games</h2>
        <ul className="space-y-3">
          <li className="p-4 bg-orange-800 rounded-lg flex items-center gap-3 hover:bg-orange-700 transition-colors">
            <i className="pi pi-star text-yellow-400 text-xl"></i>
            <span className="text-lg">Kings Cup</span>
          </li>
          <li className="p-4 bg-orange-800 rounded-lg flex items-center gap-3 hover:bg-orange-700 transition-colors">
            <i className="pi pi-glass-cheers text-pink-300 text-xl"></i>
            <span className="text-lg">Never Have I Ever</span>
          </li>
          <li className="p-4 bg-orange-800 rounded-lg flex items-center gap-3 hover:bg-orange-700 transition-colors">
            <i className="pi pi-cog text-orange-300 text-xl"></i>
            <span className="text-lg">Custom Deck</span>
          </li>
        </ul>
      </section>
    </main>
  );
}
