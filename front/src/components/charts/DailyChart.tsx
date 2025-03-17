import theme from "@/styles/theme";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useState, useEffect, useMemo } from "react";

interface ChartProps {
  data: {
    timestamp: number;
    visitors: number;
  }[];
  realtimeVisitors?: number;
  currentHour?: number;
}

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const getCurrentTime = (): string => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  return `${hours}:00`;
};

export const DailyChart = ({
  data,
  realtimeVisitors,
  currentHour,
}: ChartProps) => {
  const transformedData = useMemo(
    () =>
      data.map((entry) => {
        const entryHour = new Date(entry.timestamp).getHours();
        if (currentHour === entryHour && realtimeVisitors) {
          return {
            ...entry,
            visitors: entry.visitors + realtimeVisitors,
            time: formatTime(entry.timestamp),
          };
        }
        return {
          ...entry,
          time: formatTime(entry.timestamp),
        };
      }),
    [data, realtimeVisitors, currentHour],
  );

  const [currentTime, setCurrentTime] = useState(getCurrentTime);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentTime());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={transformedData}
        margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.chart.grid} />
        <XAxis
          dataKey="time"
          stroke={theme.colors.chart.axis}
          tick={{ fill: theme.colors.chart.axis }}
          interval={0}
          ticks={transformedData
            .filter((_, index) => index % 2 === 0)
            .map((d) => d.time)}
        />
        <YAxis
          stroke={theme.colors.chart.axis}
          tick={{ fill: theme.colors.chart.axis }}
        />
        <Tooltip />
        <ReferenceLine
          x={currentTime}
          stroke={theme.colors.chart.reference}
          strokeWidth={2}
          strokeDasharray="3 3"
          label={{
            value: "Current Time",
            position: "top",
            fill: theme.colors.chart.reference,
            fontSize: 12,
            dy: -10,
          }}
        />
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="url(#colorGradient)"
          strokeWidth={3}
          dot={{
            fill: theme.colors.chart.dot.default,
            strokeWidth: 2,
          }}
          activeDot={{
            r: 8,
            fill: theme.colors.chart.dot.active,
          }}
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={theme.colors.chart.gradient.start} />
            <stop offset="100%" stopColor={theme.colors.chart.gradient.end} />
          </linearGradient>
        </defs>
      </LineChart>
    </ResponsiveContainer>
  );
};
