// components/ChartNavigation.tsx
'use client'

import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ChartNavigationProps {
  onLogout: () => void;
}

export const ChartNavigation = ({ onLogout }: ChartNavigationProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
  
    const backgroundColor = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']);
    const boxShadow = useTransform(scrollY, [0, 50], ['none', '0 5px 15px rgba(0, 0, 0, 0.1)']);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <Nav style={{ backgroundColor, boxShadow }} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        <NavContainer>
          <LogoAndLinks>
            <Logo href="/statistics" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              My Chart
            </Logo>
            <NavLinks>
              <NavLink 
                href="/statistics"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                통계
              </NavLink>
              <NavLink 
                href="/inquiries"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                문의내역
              </NavLink>
            </NavLinks>
          </LogoAndLinks>
          <ButtonContainer>
            <NavButton 
              href="/"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              포트폴리오로 돌아가기
            </NavButton>
            <LogoutButton
              onClick={(e) => {
                e.preventDefault();
                onLogout();
              }}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              로그아웃
            </LogoutButton>
          </ButtonContainer>
        </NavContainer>
      </Nav>
    );
  };
  

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(to right, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavButton = styled(motion.a)`
  padding: 0.8rem 1.5rem;
  background: transparent;
  color: #007bff;
  border: 2px solid #007bff;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 123, 255, 0.1);
  }
`;

const LogoutButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #007bff, #00ff88);
  color: white;
  border: none;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.2);
`;

const LogoAndLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(motion.a)`
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, #007bff, #00ff88);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &[aria-current="page"] {
    color: #007bff;
    &::after {
      width: 100%;
    }
  }
`;