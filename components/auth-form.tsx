'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormData = z.infer<typeof authSchema>;

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabase } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  async function onSubmit(data: AuthFormData) {
    if (!supabase) return;

    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
      }
      router.push('/create');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-orange-800 rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h2>

      {error && <Message severity="error" text={error} className="w-full" />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium">
            Email
          </label>
          <InputText
            id="email"
            type="email"
            {...register('email')}
            className={errors.email ? 'p-invalid' : ''}
            placeholder="Enter your email"
          />
          {errors.email && <small className="p-error">{errors.email.message}</small>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium">
            Password
          </label>
          <Password
            id="password"
            {...register('password')}
            className={errors.password ? 'p-invalid' : ''}
            placeholder="Enter your password"
            feedback={false}
            toggleMask
          />
          {errors.password && <small className="p-error">{errors.password.message}</small>}
        </div>

        <Button
          type="submit"
          label={isSignUp ? 'Sign Up' : 'Sign In'}
          className="w-full p-button-lg"
          loading={loading}
        />
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-orange-200 hover:text-white underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
