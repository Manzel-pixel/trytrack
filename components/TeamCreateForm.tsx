'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ok } from '@/lib/safe';

export function TeamCreateForm({ orgId, onCreated }: { orgId: string; onCreated?: () => void }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    try {
      await ok(supabase.from('teams').insert({ org_id: orgId, name, age_group: age }));
      setName(''); setAge('');
      onCreated?.();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <input className="border rounded-xl px-3 py-2" placeholder="Team name (e.g. U16A)"
             value={name} onChange={(e)=>setName(e.target.value)} required />
      <input className="border rounded-xl px-3 py-2" placeholder="Age group (e.g. U16)"
             value={age} onChange={(e)=>setAge(e.target.value)} />
      <button disabled={busy} className="bg-brand text-white rounded-xl px-4 py-2">
        {busy ? 'Saving…' : 'Add Team'}
      </button>
      {err && <div className="text-red-600 sm:col-span-3">{err}</div>}
    </form>
  );
}
