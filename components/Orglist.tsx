'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Org = { id: string; name: string };

export function OrgList() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setErr(null); setLoading(true);
      const { data, error } = await supabase
        .from('organizations')
        .select('id,name')
        .order('name', { ascending: true });
      if (error) setErr(error.message);
      else setOrgs(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading organizations…</div>;
  if (err) return <div className="text-red-600">Error: {err}</div>;
  if (!orgs.length) return <div>No organizations accessible (check memberships in Supabase).</div>;

  return <ul className="list-disc pl-5 space-y-1">{orgs.map(o => <li key={o.id}>{o.name}</li>)}</ul>;
}

