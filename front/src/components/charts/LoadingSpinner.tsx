import styled from '@emotion/styled';

export const LoadingSpinner = () => (
  <LoadingContainer>
    <Spinner>Loading...</Spinner>
  </LoadingContainer>
);

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
`;

const Spinner = styled.div`
  font-size: 1.2rem;
  color: #007bff;
  font-weight: 500;
`;
