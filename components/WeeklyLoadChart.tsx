
'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { day: 'Mon', load: 220 },
  { day: 'Tue', load: 300 },
  { day: 'Wed', load: 260 },
  { day: 'Thu', load: 340 },
  { day: 'Fri', load: 180 },
  { day: 'Sat', load: 420 },
  { day: 'Sun', load: 200 }
];

export function WeeklyLoadChart() {
  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="load" stroke="#0A58CA" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
