'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function UserBar() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange(async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  if (!email) {
    return <a href="/login" className="text-sm text-brand">Login</a>;
  }
  return <div className="text-sm text-neutral-600">Signed in as <b>{email}</b></div>;
}
