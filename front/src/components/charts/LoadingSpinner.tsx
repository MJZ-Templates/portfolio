import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const LoadingSpinner = () => (
  <LoadingContainer>
    <SpinnerGroup>
      <SpinnerRing />
      <SpinnerRing />
      <SpinnerRing />
      <LoadingText>LOADING</LoadingText>
    </SpinnerGroup>
  </LoadingContainer>
);

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const glow = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
`;

const SpinnerGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
`;

const SpinnerRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #007bff;
  animation: ${spin} 1.5s linear infinite;

  &:nth-of-type(1) {
    border-top-color: #007bff;
  }

  &:nth-of-type(2) {
    border-right-color: #00ff88;
    animation-duration: 2s;
  }

  &:nth-of-type(3) {
    border-bottom-color: #6c757d;
    animation-duration: 2.5s;
  }
`;

const LoadingText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #007bff;
  animation: ${glow} 1.5s ease-in-out infinite;
`;

export default LoadingSpinner;