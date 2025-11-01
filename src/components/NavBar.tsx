'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function NavBar() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/sign-in';
  }

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-neutral-900">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-white tracking-tight text-lg">
          <span className="mr-2 inline-block rounded-md border border-neutral-700 px-2 py-0.5">V</span>
          VisionGrid Studio
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-white/90 hover:text-white">Dashboard</Link>
          <Link href="/projects" className="text-sm text-white/90 hover:text-white">Projects</Link>
          {email ? (
            <button onClick={handleSignOut} className="ml-2 rounded-md bg-white text-black text-sm px-3 py-1.5">
              Sign out
            </button>
          ) : (
            <Link href="/sign-in" className="ml-2 rounded-md bg-white text-black text-sm px-3 py-1.5">
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
