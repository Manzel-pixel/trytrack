'use client';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export function AuthMenu() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange(async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    location.href = '/login';
  }

  if (!email) return <a href="/login" className="text-sm text-brand">Login</a>;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-neutral-600">{email}</span>
      <button onClick={signOut} className="bg-neutral-200 hover:bg-neutral-300 px-3 py-1.5 rounded-lg">
        Logout
      </button>
    </div>
  );
}
