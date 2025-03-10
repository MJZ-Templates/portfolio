// components/charts/WeeklyChart/index.tsx
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { getVisitorWeekly } from '@/shared/visitor';
import { WeekResult } from '@/shared/visitor/type';

interface WeeklyChartProps {}

export const WeeklyChart: React.FC<WeeklyChartProps> = () => {
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [data, setData] = useState<WeekResult[]>([]);

  const getMonday = (weekOffset: number) => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) + (weekOffset * 7); // 월요일 기준 날짜 계산
    date.setDate(diff);
    return date;
  };

  const fetchWeeklyData = async (weekOffset: number) => {
    const startDate = getMonday(weekOffset).toISOString().split('T')[0]; // 날짜 형식 변환
    try {
      const response = await getVisitorWeekly({ params: { startDate } });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    }
  };

  useEffect(() => {
    fetchWeeklyData(weekOffset);
  }, [weekOffset]);

  const handlePrevWeek = () => {
    setWeekOffset(weekOffset - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset(weekOffset + 1);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <TooltipContainer>
          <TooltipDate>{new Date(payload[0].payload.date).toLocaleDateString()}</TooltipDate>
          <TooltipValue>방문자: {payload[0].value}명</TooltipValue>
        </TooltipContainer>
      );
    }
    return null;
  };

  const today = new Date();
  const currentMonday = getMonday(0);
  const nextMonday = new Date(currentMonday.getTime() + (weekOffset + 1) * 7 * 24 * 60 * 60 * 1000);
  const isNextWeekFuture = nextMonday > today;

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>주간 방문자 현황</ChartTitle>
        <WeekController>
          <ControlButton onClick={handlePrevWeek}>
            ←
          </ControlButton>
          <WeekDisplay>
            {data.length ? `${new Date(data[0].date).toLocaleDateString()} ~ ${new Date(data[data.length-1].date).toLocaleDateString()}` : '데이터를 불러오는 중...'}
          </WeekDisplay>
          <ControlButton onClick={handleNextWeek} disabled={isNextWeekFuture}>
            →
          </ControlButton>
        </WeekController>
      </ChartHeader>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="date" 
              stroke="#666"
              tick={{ fill: '#666' }}
              tickFormatter={(tickItem) => new Date(tickItem).toLocaleDateString()} 
            />
            <YAxis 
              stroke="#666"
              tick={{ fill: '#666' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              fill="url(#weeklyGradient)"
              radius={[8, 8, 0, 0]}
              barSize={60}
            />
            <defs>
              <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007bff" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#00ff88" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ChartCard>
  );
};

const ChartCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ChartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const WeekController = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: ${props => props.disabled ? '#eee' : 'linear-gradient(135deg, #007bff, #00ff88)'};
  color: ${props => props.disabled ? '#666' : 'white'};
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
  }
`;

const WeekDisplay = styled.div`
  font-size: 1rem;
  color: #666;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const TooltipContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
`;

const TooltipDate = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const TooltipValue = styled.p`
  font-size: 1.1rem;
  color: #007bff;
  font-weight: 600;
`;
