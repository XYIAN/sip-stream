# SipStream

SipStream is a playful, mobile-first web app for real-time, multi-user drinking games. Built with Next.js, TypeScript, Tailwind CSS, PrimeReact, and Supabase.

## Features

- Real-time game state sync with Supabase
- Email/password authentication
- Multiple game types (Kings Cup, Never Have I Ever, Custom Deck)
- Mobile-first, responsive UI
- PrimeReact themed components and playful drink icons

## Tech Stack

- Next.js 15.3.3+
- TypeScript
- Tailwind CSS
- PrimeReact, PrimeFlex, PrimeIcons
- Supabase (auth + realtime)
- React Hook Form + Zod

## Setup

1. Clone the repo:
   ```sh
   git clone https://github.com/your-username/sip-stream.git
   cd sip-stream
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Lint code

## License

MIT
