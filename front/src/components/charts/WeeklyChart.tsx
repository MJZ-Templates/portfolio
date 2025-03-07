// components/charts/WeeklyChart/index.tsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { generateWeeklyData } from '@/data/mockWeeklyData';

interface WeeklyChartProps {}

export const WeeklyChart = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [data, setData] = useState(generateWeeklyData(0));

  const handlePrevWeek = () => {
    const newOffset = weekOffset - 1;
    setWeekOffset(newOffset);
    setData(generateWeeklyData(newOffset));
  };

  const handleNextWeek = () => {
    const newOffset = weekOffset + 1;
    setWeekOffset(newOffset);
    setData(generateWeeklyData(newOffset));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <TooltipContainer>
          <TooltipDate>{payload[0].payload.date}</TooltipDate>
          <TooltipValue>방문자: {payload[0].value}명</TooltipValue>
        </TooltipContainer>
      );
    }
    return null;
  };

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>주간 방문자 현황</ChartTitle>
        <WeekController>
          <ControlButton onClick={handlePrevWeek}>
            ←
          </ControlButton>
          <WeekDisplay>
            {data[0].date} ~ {data[data.length-1].date}
          </WeekDisplay>
          <ControlButton onClick={handleNextWeek} disabled={weekOffset === 0}>
            →
          </ControlButton>
        </WeekController>
      </ChartHeader>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="day" 
              stroke="#666"
              tick={{ fill: '#666' }}
            />
            <YAxis 
              stroke="#666"
              tick={{ fill: '#666' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="visitors" 
              fill="url(#weeklyGradient)"
              radius={[8, 8, 0, 0]}
              barSize={60}
            />
            <defs>
              <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007bff" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#00ff88" stopOpacity={0.8}/>
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