'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ok } from '@/lib/safe';

export function PlayerCreateForm({ orgId, teamId, onCreated }:{
  orgId: string; teamId: string; onCreated?: () => void;
}) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    try {
      await ok(supabase.from('players').insert({
        org_id: orgId, team_id: teamId, full_name: name, position
      }));
      setName(''); setPosition('');
      onCreated?.();
    } catch (e:any) {
      setErr(e.message);
    } finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <input className="border rounded-xl px-3 py-2" placeholder="Full name"
             value={name} onChange={(e)=>setName(e.target.value)} required />
      <input className="border rounded-xl px-3 py-2" placeholder="Position (e.g. Fly-half)"
             value={position} onChange={(e)=>setPosition(e.target.value)} />
      <button disabled={busy} className="bg-brand text-white rounded-xl px-4 py-2">
        {busy ? 'Adding…' : 'Add Player'}
      </button>
      {err && <div className="text-red-600 sm:col-span-3">{err}</div>}
    </form>
  );
}
