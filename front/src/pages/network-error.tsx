import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const NetworkErrorPage: React.FC = () => {
  return (
    <ErrorSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ErrorContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Title>Network Error</Title>
        <Subtitle>The server is currently unavailable. Please try again later.</Subtitle>

        <ContentSection>
          <ContentTitle>Possible Causes:</ContentTitle>
          <List>
            <ListItem>• Server is down or under maintenance</ListItem>
            <ListItem>• Unstable network connection</ListItem>
            <ListItem>• Server is overloaded with too many requests</ListItem>
            <ListItem>• Your internet connection is not working properly</ListItem>
            <ListItem>• Firewall or security settings are blocking the connection</ListItem>
            <ListItem>• DNS resolution problems</ListItem>
            <ListItem>• Server timeout due to high traffic</ListItem>
          </List>

          <ContentTitle>Troubleshooting Steps:</ContentTitle>
          <List>
            <ListItem>• Refresh the page</ListItem>
            <ListItem>• Check your internet connection</ListItem>
            <ListItem>• Clear your browser cache</ListItem>
            <ListItem>• Try again in a few minutes</ListItem>
          </List>
        </ContentSection>
      </ErrorContainer>
    </ErrorSection>
  );
};

const ErrorSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  box-sizing: border-box;
`;

const ErrorContainer = styled(motion.div)`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
  background: linear-gradient(to right, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const ContentSection = styled.div`
  margin: 20px 0;
`;

const ContentTitle = styled.h2`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
`;

const ListItem = styled.li`
  color: #666;
  padding: 8px 0;
  font-size: 0.95rem;
  
  &:hover {
    color: #007bff;
    transition: color 0.3s ease;
  }
`;

export default NetworkErrorPage;