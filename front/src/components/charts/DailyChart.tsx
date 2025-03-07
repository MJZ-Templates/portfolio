import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useState, useEffect } from 'react';

interface ChartProps {
  data: {
    timestamp: number;
    visitors: number;
  }[];
}

// 타임스탬프를 HH:mm 형식의 문자열로 변환하는 함수
const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// 데이터를 변환: timestamp를 time 문자열로 변환
const transformData = (data: { timestamp: number; visitors: number }[]) => {
  return data.map((entry) => ({
    ...entry,
    time: formatTime(entry.timestamp),
  }));
};

export const DailyChart = ({ data }: ChartProps) => {
  const [currentTime, setCurrentTime] = useState(() => {
    // 초기값 설정
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:00`; // 시간대별 데이터이므로 분은 00으로 고정
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      setCurrentTime(`${hours}:00`); // 시간대별 데이터이므로 분은 00으로 고정
    };

    // 초기 실행
    updateTime();

    // 1분마다 업데이트
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const transformedData = transformData(data);

  console.log('Current Time:', currentTime);
  console.log('Data times:', transformedData.map(d => d.time));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={transformedData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis 
          dataKey="time" 
          stroke="#666"
          tick={{ fill: '#666' }}
          interval={0} // tick을 2시간 간격으로 표시
          ticks={transformedData.filter((_, index) => index % 2 === 0).map(d => d.time)}
        />
        <YAxis 
          stroke="#666"
          tick={{ fill: '#666' }}
        />
        <Tooltip />
        <ReferenceLine
          x={currentTime}
          stroke="#4A90E2"
          strokeWidth={2}
          strokeDasharray="3 3"
          label={{
            value: "현재",
            position: "top",
            fill: "#4A90E2",
            fontSize: 12,
            dy: -10
          }}
        />
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
};
