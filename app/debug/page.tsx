'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DebugPage() {
  const [msg, setMsg] = useState('Checking…');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('organizations').select('id').limit(1);
        if (error) setMsg('Supabase error: ' + error.message);
        else setMsg('OK: fetched (rows: ' + (data?.length ?? 0) + ')');
      } catch (e:any) {
        setMsg('Network failed: ' + e.message);
      }
    })();
  }, []);

  return (
    <div className="container-page py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Debug</h1>
      <div className="card p-4"><b>SUPABASE_URL:</b> {String(url)}</div>
      <div className="card p-4"><b>Fetch test:</b> {msg}</div>
    </div>
  );
}
