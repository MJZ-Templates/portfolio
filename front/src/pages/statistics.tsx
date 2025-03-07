'use client'

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockVisitorData } from '@/data/mockVisitorData';
import { DailyChart } from '@/components/charts/DailyChart';
import { LoadingSpinner } from '@/components/charts/LoadingSpinner';
import { TotalVisitors } from '@/components/charts/TotalVisitors';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const formattedData = mockVisitorData.map(item => {
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
      </ContentWrapper>
    </Container>
  );
};

export default Statistics;

const Container = styled.div`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: #f8f9fa;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

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
  background: linear-gradient(to right, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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