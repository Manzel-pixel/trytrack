'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type Team = { id: string; name: string; age_group: string | null };

export function TeamsTable({ orgId }: { orgId: string }) {
  const [rows, setRows] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null); setLoading(true);
    const { data, error } = await supabase
      .from('teams')
      .select('id,name,age_group')
      .eq('org_id', orgId)
      .order('name', { ascending: true });
    if (error) setErr(error.message); else setRows(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, [orgId]);

  if (loading) return <div>Loading teams…</div>;
  if (err) return <div className="text-red-600">Error: {err}</div>;
  if (!rows.length) return <div>No teams yet.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-500">
            <th className="py-2 pr-4">Team</th>
            <th className="py-2 pr-4">Age Group</th>
            <th className="py-2 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t">
              <td className="py-2 pr-4">{r.name}</td>
              <td className="py-2 pr-4">{r.age_group ?? '—'}</td>
              <td className="py-2 pr-4">
                <Link className="text-brand underline" href={`/teams/${r.id}`}>Open</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
