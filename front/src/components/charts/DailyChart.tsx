import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface ChartProps {
  data: {
    time: string;
    hour: number;
    minute: string;
    visitors: number;
    timestamp: number;
  }[];
}

export const DailyChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
      <XAxis 
        dataKey="time" 
        stroke="#666"
        tick={{ fill: '#666' }}
        interval={1}
      />
      <YAxis 
        stroke="#666"
        tick={{ fill: '#666' }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Line
        type="monotone"
        dataKey="visitors"
        stroke="url(#colorGradient)"
        strokeWidth={3}
        dot={{ fill: '#007bff', strokeWidth: 2 }}
        activeDot={{ r: 8, fill: '#00ff88' }}
      />
      <defs>
        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#007bff" />
          <stop offset="100%" stopColor="#00ff88" />
        </linearGradient>
      </defs>
    </LineChart>
  </ResponsiveContainer>
);
