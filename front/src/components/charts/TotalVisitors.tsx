import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface TotalVisitorsProps {
  totalVisitors: number;
}

export const TotalVisitors = ({ totalVisitors }: TotalVisitorsProps) => (
  <TotalVisitorsContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <VisitorLabel>오늘의 총 방문자</VisitorLabel>
    <VisitorCount
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }}
    >
      {totalVisitors}
    </VisitorCount>
    <VisitorSubtext>명이 방문했어요</VisitorSubtext>
  </TotalVisitorsContainer>
);

const TotalVisitorsContainer = styled(motion.div)`
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 300px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 123, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    padding: 1rem 1.5rem;
  }
`;

const VisitorCount = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const VisitorLabel = styled.div`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const VisitorSubtext = styled.div`
  font-size: 1rem;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;