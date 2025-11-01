'use client';

import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/sign-in';
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">VisionGrid Studio</h1>

      {email ? (
        <>
          <p className="opacity-80 mb-6">Signed in as {email}</p>
          <div className="flex gap-3 mb-8">
            <Link href="/dashboard" className="px-4 py-2 rounded-md bg-white text-black">Dashboard</Link>
            <Link href="/projects" className="px-4 py-2 rounded-md bg-white text-black">Projects</Link>
            <button onClick={handleSignOut} className="px-4 py-2 rounded-md bg-neutral-200 text-black">Sign out</button>
          </div>
        </>
      ) : (
        <div className="flex gap-3 mb-8">
          <Link href="/sign-in" className="px-4 py-2 rounded-md bg-white text-black">Sign in</Link>
        </div>
      )}

      <p className="opacity-60">This is your temporary home screen. We’ll replace it with a cinematic shell later.</p>
    </main>
  );
}
