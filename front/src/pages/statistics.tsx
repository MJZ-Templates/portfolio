// pages/statistics.tsx
'use client'

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DailyChart } from '@/components/charts/DailyChart';
import { LoadingSpinner } from '@/components/charts/LoadingSpinner';
import { TotalVisitors } from '@/components/charts/TotalVisitors';
import { ChartNavigation } from '@/components/common/ChartNavigation/ChartNavigation';
import { WeeklyChart } from '@/components/charts/WeeklyChart';
import { getVisitorHour } from '@/shared/visitor';
import { HourResult, GetVisitorHourResponse } from '@/shared/visitor/type';
import { useRouter } from 'next/router';
import { postAuthToken } from '@/shared/auth';
import { configureSocketClient, onConnectHandler, onErrorHandler, socketConnect } from '@/shared/socket';
import { ACCESS_TOKEN_KEY } from '@/lib/constant/api';
import { PATH } from '@/lib/constant/path';
import { SocketMessageResponse } from '@/shared/socket/type';

interface FormattedData {
  timestamp: number;
  visitors: number;
}

const Statistics = () => {
  const router = useRouter();
  const [data, setData] = useState<FormattedData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [realtimeVisitors, setRealtimeVisitors] = useState(0);
  const [socketData, setSocketData] = useState<SocketMessageResponse | null>(null);
  
  const [currentHourVisitors, setCurrentHourVisitors] = useState<number>(0);
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  const [weeklyRealtimeVisitors, setWeeklyRealtimeVisitors] = useState(0);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  useEffect(() => {
    console.log('realtimeVisitors changed:', realtimeVisitors);
  }, [realtimeVisitors]);

  const transformData = (data: HourResult[]): FormattedData[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');

    return data.map((entry) => ({
      timestamp: new Date(`${year}-${month}-${day}T${String(entry.time).padStart(2, '0')}:00:00`).getTime(),
      visitors: entry.visitors.length
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    alert('Logout');
    router.push('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const visitorData: GetVisitorHourResponse = await getVisitorHour();

        if (visitorData.success) {
          const formattedData = transformData(visitorData.data);
          setData(formattedData);
        } else {
          console.error('Error fetching data:', visitorData.error);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Fetch auth token and connect websocket
    const connectSocket = async () => {
      try {
        const authResponse = await postAuthToken();
        if (authResponse.data.isSuccess) {
          const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
          if (accessToken) {
            const stompClient = socketConnect(accessToken);
            
            const handleConnect = (frame: any) => {
              console.log('Socket connected!');
              
              if (stompClient.connected) {
                try {
                  stompClient.subscribe(PATH.SUBSCRIBE_SOCKET, (message) => {
                    console.log('Received message:', message);
                    const socketData: SocketMessageResponse = JSON.parse(message.body);
                    setRealtimeVisitors(prev => prev + 1);
                    setCurrentHourVisitors(prev => prev + 1);
                    setWeeklyRealtimeVisitors(prev => prev + 1);
                  });
                  console.log('Subscription successful');
                } catch (error) {
                  console.error('Subscription error:', error);
                }
              } else {
                console.error('StompClient not connected');
              }
            };
    
            configureSocketClient(
              stompClient,
              handleConnect,
              onErrorHandler
            );
    
            stompClient.activate();
          }
        }
      } catch (error) {
        console.error('Error during socket connection: ', error);
      }
    };

    connectSocket();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);

  const updateVisitorCount = (socketData: SocketMessageResponse) => {
    const visitTime = new Date(socketData.visitedAt);
    const hour = visitTime.getHours();

    setData(prevData => {
      return prevData.map(item => {
        const itemHour = new Date(item.timestamp).getHours();
        if (itemHour === hour) {
          console.log(`Updating visitor count for hour ${hour}`);
          return {
            ...item,
            visitors: item.visitors + 1
          };
        }
        return item;
      });
    });
  };

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
          <TotalVisitors 
            totalVisitors={totalVisitors} 
            realtimeVisitors={realtimeVisitors} 
          />
        </ChartHeader>

        <ChartCard>
          <ChartTitle>시간대별 방문자 현황</ChartTitle>
          <ChartContainer>
            <DailyChart       data={data} 
      realtimeVisitors={currentHourVisitors}
      currentHour={currentHour} />
          </ChartContainer>
        </ChartCard>
        <WeeklyChart realtimeVisitors={weeklyRealtimeVisitors} 
        currentDay={currentDay} />
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
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0; 
  background: #333;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: 6rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    padding-left: 0;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
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

const displayMessage = (message: string) => {
  console.log("socket", message);
  const messageContainer = document.getElementById("messages");
  
  if (messageContainer) {
    const newMessageDiv = document.createElement("div");
    newMessageDiv.classList.add("message");
    newMessageDiv.innerText = message;
    messageContainer.appendChild(newMessageDiv);
  } else {
    console.error('Element with ID "messages" not found.');
  }
};
