'use client';

import { AuthForm } from '../../../components/auth-form';
import Link from 'next/link';
import { Button } from 'primereact/button';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-orange-900 to-red-700 text-white">
      <div className="absolute top-4 left-4">
        <Link href="/" passHref legacyBehavior>
          <Button icon="pi pi-arrow-left" className="p-button-text p-button-rounded" />
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Sign In or Register</h1>
      <AuthForm />
    </main>
  );
}
