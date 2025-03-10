// pages/statistics.tsx
'use client'

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockDailyData } from '@/data/mockDailyData';
import { DailyChart } from '@/components/charts/DailyChart';
import { LoadingSpinner } from '@/components/charts/LoadingSpinner';
import { TotalVisitors } from '@/components/charts/TotalVisitors';
import { ChartNavigation } from '@/components/common/ChartNavigation/ChartNavigation';
import { WeeklyChart } from '@/components/charts/WeeklyChart';

interface VisitData {
  timestamp: number;
  visitors: number;
}

interface FormattedData {
  time: string;
  hour: number;
  minute: string;
  visitors: number;
  timestamp: number;
}

const Statistics = () => {
  const [data, setData] = useState<FormattedData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    console.log("Logout");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const formattedData = mockDailyData.map(item => {
          const date = new Date(item.timestamp);
          return {
            time: `${String(date.getHours()).padStart(2, '0')}:00`,
            hour: date.getHours(),
            minute: '00',
            visitors: item.visitors,
            timestamp: item.timestamp
          };
        });

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);

  return (
    <Container>
      <NavWrapper>
        <ChartNavigation onLogout={handleLogout} />
      </NavWrapper>
      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ChartHeader>
          <Title>방문자 통계</Title>
          <TotalVisitors totalVisitors={totalVisitors} />
        </ChartHeader>

        <ChartCard>
          <ChartTitle>시간대별 방문자 현황</ChartTitle>
          <ChartContainer>
            <DailyChart data={data} />
          </ChartContainer>
        </ChartCard>
        <WeeklyChart />
      </ContentWrapper>
    </Container>
  );
};

export default Statistics;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: #f8f9fa;
  overflow: auto;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const NavWrapper = styled(motion.header)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: #333;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: 6rem;
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
`;
