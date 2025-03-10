// components/Header/Header.tsx
'use client'

import styled from '@emotion/styled';
import { Navigation } from '../Navigation/Navigation';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <HeaderWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled(motion.header)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;