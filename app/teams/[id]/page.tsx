import { TeamPlayers } from '@/components/TeamPlayers';

export default function TeamDetail({ params }: { params: { id: string }}) {
  return (
    <div className="container-page py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Team</h1>
      <div className="card p-5 space-y-4">
        <TeamPlayers teamId={params.id} />
      </div>
    </div>
  );
}
