import { KPIGrid } from "../components/KPIGrid";
import { WeeklyLoadChart } from "../components/WeeklyLoadChart";
import { WellnessTable } from "../components/WellnessTable";
import { AuthMenu } from "../components/AuthMenu";
import { OrgList } from "../components/OrgList";

export default function Page() {
  return (
    <div className="container-page py-8 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <AuthMenu />
      </header>

      <section className="card p-5">
        <h2 className="font-semibold mb-2">Your Organizations</h2>
        <OrgList />
      </section>

      <KPIGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 card p-5">
          <h2 className="font-semibold mb-3">Weekly Training Load</h2>
          <WeeklyLoadChart />
        </section>
        <section className="card p-5">
          <h2 className="font-semibold mb-3">Today’s Wellness Check‑ins</h2>
          <WellnessTable />
        </section>
      </div>
    </div>
  );
}
