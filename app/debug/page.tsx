'use client';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [msg, setMsg] = useState('Checking…');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; // will be inlined at build

  useEffect(() => {
    async function run() {
      try {
        const { data, error } = await supabase.from('organizations').select('id').limit(1);
        if (error) setMsg('Supabase error: ' + error.message);
        else setMsg('OK: Fetched (rows: ' + (data?.length ?? 0) + ')');
      } catch (e: any) {
        setMsg('Network failed: ' + e?.message);
      }
    }
    run();
  }, []);

  return (
    <div className="container-page py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Debug</h1>
      <div className="card p-4">
        <div><b>SUPABASE_URL seen by app:</b> {String(url)}</div>
      </div>
      <div className="card p-4">
        <div><b>Fetch test:</b> {msg}</div>
        <p className="text-sm text-neutral-600 mt-2">
          If SUPABASE_URL is <i>undefined</i>, Vercel env vars weren’t available at build time.
          If “Network failed”, it’s usually a bad URL or mixed content (http vs https).
        </p>
      </div>
    </div>
  );
}
