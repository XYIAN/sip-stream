"use client";

import Link from "next/link";
import { Button } from "primereact/button";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-orange-900 to-red-700 text-white">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">SipStream</h1>
        <p className="text-lg mb-4">
          Play drinking games with friends, anywhere, in real time!
        </p>
        <Link href="/login" passHref legacyBehavior>
          <Button
            label="Start or Join a Game"
            className="p-button-lg p-button-rounded bg-orange-600 border-none"
          />
        </Link>
      </section>
      <section className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Popular Games</h2>
        <ul className="space-y-2">
          <li className="p-4 bg-orange-800 rounded-lg flex items-center gap-2">
            <i className="pi pi-star text-yellow-400"></i>Kings Cup
          </li>
          <li className="p-4 bg-orange-800 rounded-lg flex items-center gap-2">
            <i className="pi pi-glass-cheers text-pink-300"></i>Never Have I
            Ever
          </li>
          <li className="p-4 bg-orange-800 rounded-lg flex items-center gap-2">
            <i className="pi pi-cog text-orange-300"></i>Custom Deck
          </li>
        </ul>
      </section>
    </main>
  );
}
