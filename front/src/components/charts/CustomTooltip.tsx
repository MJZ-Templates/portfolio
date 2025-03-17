import styled from '@emotion/styled';
import theme from '@/styles/theme';

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <TooltipTime>{label}</TooltipTime>
        <TooltipValue>Visitors: {payload[0].value}</TooltipValue>
      </TooltipContainer>
    );
  }
  return null;
};

const TooltipContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.colors.border.light};
`;

const TooltipTime = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const TooltipValue = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.primary};
  font-weight: 600;
`;
