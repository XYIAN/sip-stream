import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['@supabase/supabase-js'],
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default nextConfig;
