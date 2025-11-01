'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
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
      <h1 className="text-3xl mb-3">VisionGrid Dashboard</h1>
      {email ? (
        <>
          <p className="opacity-80 mb-6">Signed in as {email}</p>
          <button onClick={handleSignOut} className="px-4 py-2 rounded-md bg-white text-black">
            Sign out
          </button>
        </>
      ) : (
        <p>Not signed in. Go to <a href="/sign-in" className="underline">/sign-in</a>.</p>
      )}
    </main>
  );
}
