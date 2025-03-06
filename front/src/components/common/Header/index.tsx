// components/Header/Header.tsx
import styled from '@emotion/styled';
import Navigation from '../Navigation';

const Header = () => {
  return (
    <HeaderWrapper>
      <Navigation />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
`;

export default Header;