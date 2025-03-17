import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

interface TotalVisitorsProps {
  totalVisitors: number;
  realtimeVisitors: number;
}

export const TotalVisitors = ({
  totalVisitors,
  realtimeVisitors,
}: TotalVisitorsProps) => {
  const [currentTotal, setCurrentTotal] = useState(
    totalVisitors + realtimeVisitors,
  );
  const controls = useAnimation();

  useEffect(() => {
    const newTotal = totalVisitors + realtimeVisitors;
    const duration = 1;

    controls.start({
      x: [0, 0],
      opacity: [0, 1],
      transition: { duration },
    });

    setCurrentTotal(newTotal);
  }, [totalVisitors, realtimeVisitors, controls]);

  useEffect(() => {}, [totalVisitors, realtimeVisitors, currentTotal]);

  return (
    <TotalVisitorsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VisitorLabel>Total Visitors Today</VisitorLabel>
      <VisitorCountWrapper animate={controls} initial={{ opacity: 0 }}>
        <motion.span
          key={currentTotal}
          initial={{ scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {currentTotal}
        </motion.span>
      </VisitorCountWrapper>
      <VisitorSubtext>people visited</VisitorSubtext>
    </TotalVisitorsContainer>
  );
};

const TotalVisitorsContainer = styled(motion.div)`
  background: ${theme.colors.background.white};
  padding: 1.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px ${theme.colors.shadow.secondary};
  text-align: center;
  min-width: 300px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px ${theme.colors.shadow.primary};
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    padding: 1rem 1.5rem;
  }
`;

const VisitorCountWrapper = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 700;
  background: ${theme.colors.gradient.primary};
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
  color: ${theme.colors.text.secondary};
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
  color: ${theme.colors.text.secondary};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
