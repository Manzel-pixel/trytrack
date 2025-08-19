
const rows = [
  { name: "A. Nkosi", team: "U16A", rpe: 6, sleep: 7, soreness: 3 },
  { name: "J. Petersen", team: "U15A", rpe: 8, sleep: 5, soreness: 6 },
  { name: "T. Dlamini", team: "U18A", rpe: 5, sleep: 8, soreness: 2 },
  { name: "S. Mokoena", team: "U14B", rpe: 7, sleep: 6, soreness: 5 },
];

export function WellnessTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-500">
            <th className="py-2 pr-4">Player</th>
            <th className="py-2 pr-4">Team</th>
            <th className="py-2 pr-4">RPE</th>
            <th className="py-2 pr-4">Sleep (h)</th>
            <th className="py-2 pr-4">Soreness</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t">
              <td className="py-2 pr-4">{r.name}</td>
              <td className="py-2 pr-4">{r.team}</td>
              <td className="py-2 pr-4">{r.rpe}</td>
              <td className="py-2 pr-4">{r.sleep}</td>
              <td className="py-2 pr-4">{r.soreness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
