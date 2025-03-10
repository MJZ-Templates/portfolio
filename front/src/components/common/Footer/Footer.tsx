// components/Footer/Footer.tsx
import styled from '@emotion/styled';

export const Footer = () => {
  return (
    <FooterWrapper>
      <Copyright>© 2025 Goorm Arkain. All rights reserved.</Copyright>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  padding: 2rem 0;
  background-color: #f8f9fa;
  text-align: center;
`;

const Copyright = styled.p`
  color: #666;
`;
