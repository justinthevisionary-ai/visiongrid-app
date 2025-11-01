'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Project = {
  id: string;
  name: string;
  created_at: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function loadProjects() {
    setLoading(true);
    setMsg(null);
    const { data, error } = await supabase
      .from('projects')
      .select('id,name,created_at')
      .order('created_at', { ascending: false });
    if (error) setMsg(error.message);
    else setProjects(data || []);
    setLoading(false);
  }

  useEffect(() => {
    // ensure we have a session, then load
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/sign-in';
      } else {
        loadProjects();
      }
    });
  }, []);

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!name.trim()) return;

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return (window.location.href = '/sign-in');

    setLoading(true);
    const { error } = await supabase.from('projects').insert([
      { name: name.trim(), owner: userId }
    ]);
    if (error) setMsg(error.message);
    setName('');
    await loadProjects();
  }

  async function deleteProject(id: string) {
    setMsg(null);
    setLoading(true);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) setMsg(error.message);
    await loadProjects();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl mb-6">Projects</h1>

      <form onSubmit={createProject} className="mb-8 flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          className="px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700 outline-none w-80"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-white text-black font-medium"
          disabled={loading}
        >
          {loading ? 'Saving…' : 'Create'}
        </button>
      </form>

      {msg && <p className="text-red-400 mb-4">{msg}</p>}

      {loading && projects.length === 0 ? (
        <p className="opacity-70">Loading…</p>
      ) : projects.length === 0 ? (
        <p className="opacity-70">No projects yet.</p>
      ) : (
        <ul className="space-y-3">
          {projects.map((p) => (
            <li key={p.id} className="flex items-center justify-between border border-neutral-800 rounded-xl p-4">
              <div>
                <p className="text-lg">{p.name}</p>
                <p className="text-xs opacity-60">{new Date(p.created_at).toLocaleString()}</p>
              </div>
              <button
                onClick={() => deleteProject(p.id)}
                className="px-3 py-2 rounded-md bg-neutral-200 text-black"
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
