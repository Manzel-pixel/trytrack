
export function KPIGrid() {
  const kpis = [
    { label: "Teams", value: 6 },
    { label: "Players", value: 112 },
    { label: "Check-ins (today)", value: 86 },
    { label: "Flags", value: 4 },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {kpis.map((k) => (
        <div key={k.label} className="card p-4">
          <div className="text-sm text-neutral-500">{k.label}</div>
          <div className="text-3xl font-semibold">{k.value}</div>
        </div>
      ))}
    </div>
  );
}
