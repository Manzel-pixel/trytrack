'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PlayerCreateForm } from '@/components/PlayerCreateForm';

// 👉 Replace with your organizations.id
const ORG_ID = 'PUT-YOUR-ORG-UUID-HERE';

type Player = { id: string; full_name: string; position: string | null };

export function TeamPlayers({ teamId }: { teamId: string }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null); setLoading(true);
    const { data, error } = await supabase
      .from('players')
      .select('id,full_name,position')
      .eq('team_id', teamId)
      .order('full_name', { ascending: true });
    if (error) setErr(error.message); else setPlayers(data ?? []);
    setLoading(false);
  }

  async function remove(id: string) {
    if (!confirm('Remove this player?')) return;
    const { error } = await supabase.from('players').delete().eq('id', id);
    if (!error) load();
    else alert(error.message);
  }

  useEffect(() => { load(); }, [teamId]);

  return (
    <>
      <h2 className="font-semibold">Players</h2>
      <PlayerCreateForm orgId={ORG_ID} teamId={teamId} onCreated={load} />

      {loading ? (
        <div>Loading players…</div>
      ) : err ? (
        <div className="text-red-600">Error: {err}</div>
      ) : !players.length ? (
        <div>No players yet.</div>
      ) : (
        <div className="overflow-x-auto mt-3">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Position</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="py-2 pr-4">{p.full_name}</td>
                  <td className="py-2 pr-4">{p.position ?? '—'}</td>
                  <td className="py-2 pr-4">
                    <button onClick={() => remove(p.id)} className="text-red-600 underline">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
