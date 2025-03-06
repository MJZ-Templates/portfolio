// components/Footer/Footer.tsx
import styled from '@emotion/styled';

const Footer = () => {
  return (
    <FooterWrapper>
      <Copyright>© 2024 Your Name. All rights reserved.</Copyright>
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

export default Footer;