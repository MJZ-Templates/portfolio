// pages/admin/inquiries.tsx
'use client'

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChartNavigation } from '@/components/common/ChartNavigation/ChartNavigation';
import { LoadingSpinner } from '@/components/charts/LoadingSpinner';
import { getContactMessage } from '@/shared/contact';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const Inquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      setIsLoading(true);
      try {
        const response = await getContactMessage();
        console.log(response);

        const transformedData: Inquiry[] = response.data.map((item: any, index: number) => ({
          id: index,
          name: item.name,
          email: item.email,
          message: item.message,
          createdAt: item.createdAt,
        }));

        // Sort by createdAt in descending order
        transformedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setInquiries(transformedData);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <Container>
      <ChartNavigation onLogout={() => console.log("Logout")} />
      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Received Messages</Title>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <MessageList>
            {inquiries.map((inquiry) => (
              <MessageCard 
                key={inquiry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <MessageHeader>
                  <SenderInfo>
                    <SenderName>{inquiry.name}</SenderName>
                    <SenderEmail>{inquiry.email}</SenderEmail>
                  </SenderInfo>
                  <MessageDate>
                    {new Date(inquiry.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      hour12: true
                    })}
                  </MessageDate>
                </MessageHeader>
                <MessageContent>{inquiry.message}</MessageContent>
              </MessageCard>
            ))}
          </MessageList>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default Inquiries;

const Container = styled.div`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: #f8f9fa;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MessageCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const SenderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SenderName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const SenderEmail = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const MessageDate = styled.span`
  font-size: 0.9rem;
  color: #999;
`;

const MessageContent = styled.p`
  color: #444;
  line-height: 1.6;
  font-size: 1rem;
`;
