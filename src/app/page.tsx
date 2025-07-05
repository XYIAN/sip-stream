'use client';

import Link from 'next/link';
import { Button } from 'primereact/button';
import { useAuth } from '../hooks/useAuth';
import { useIcon } from '../components/icon-provider';

export default function HomePage() {
  const { user, loading } = useAuth();
  const icon = useIcon();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center fade-in">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 fade-in">
      <div className="text-center space-y-8 slide-up">
        <h1 className="text-6xl font-bold text-white mb-4 flex items-center justify-center gap-4 scale-in">
          <img
            src={icon}
            alt="SipStream Logo"
            className="w-16 h-16 rounded-full shadow-lg bg-white/80"
            style={{ objectFit: 'cover' }}
          />
          SipStream
        </h1>
        <p className="text-xl text-orange-200 mb-8">The ultimate real-time drinking card game</p>

        <div className="space-y-4">
          {user ? (
            <>
              <Link href="/create">
                <Button label="Create New Game" className="w-full md:w-auto p-button-lg" />
              </Link>
              <Link href="/history">
                <Button
                  label="Game History"
                  severity="secondary"
                  className="w-full md:w-auto p-button-lg"
                />
              </Link>
            </>
          ) : (
            <Link href="/login">
              <Button
                label="Get Started"
                className="w-full md:w-auto p-button-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
