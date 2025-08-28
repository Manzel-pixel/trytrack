import { TeamCreateForm } from '@/components/TeamCreateForm';
import { TeamsTable } from '@/components/TeamsTable';

// 👉 Replace this with your organizations.id from Supabase Table Editor
const ORG_ID = 'PUT-YOUR-ORG-UUID-HERE';

export default function TeamsPage() {
  return (
    <div className="container-page py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Teams</h1>

      <div className="card p-5 space-y-4">
        <h2 className="font-semibold">Create Team</h2>
        <TeamCreateForm orgId={ORG_ID} onCreated={() => location.reload()} />
      </div>

      <div className="card p-5 space-y-4">
        <h2 className="font-semibold">Your Teams</h2>
        <TeamsTable orgId={ORG_ID} />
      </div>
    </div>
  );
}
