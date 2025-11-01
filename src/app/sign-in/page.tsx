'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const redirectUrl = `${window.location.origin}/dashboard`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectUrl }
    });

    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <main className="min-h-screen grid place-items-center bg-black text-white p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-2xl border border-neutral-800">
        <h1 className="text-2xl font-semibold mb-4 tracking-tight">Sign in to VisionGrid</h1>

        {sent ? (
          <p>Check your email for a magic link. Keep this tab open.</p>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mb-3 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700 outline-none"
              required
            />
            <button type="submit" className="w-full py-2 rounded-md bg-white text-black font-medium">
              Send magic link
            </button>
            {error && <p className="text-red-400 mt-3">{error}</p>}
          </>
        )}
      </form>
    </main>
  );
}
