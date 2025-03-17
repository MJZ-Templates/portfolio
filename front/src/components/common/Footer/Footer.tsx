import styled from "@emotion/styled";
import theme from "@/styles/theme";

export const Footer = () => {
  return (
    <FooterWrapper>
      <Copyright>© 2025 Goorm Arkain. All rights reserved.</Copyright>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  padding: 2rem 0;
  background-color: ${theme.colors.background.primary};
  text-align: center;
`;

const Copyright = styled.p`
  color: ${theme.colors.input.placeholder};
`;
