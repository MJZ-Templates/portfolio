// components/ChartNavigation.tsx
'use client'

import MotionLink from '@/components/CustomLink';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MenuBarProps {
    isOpen: boolean;
  }  

interface ChartNavigationProps {
  onLogout: () => void;
}

export const ChartNavigation = ({ onLogout }: ChartNavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Nav style={{ backgroundColor, boxShadow }} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <NavContainer>
          <Logo href="/statistics" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            My Chart
          </Logo>

          <MobileMenuButton onClick={toggleMenu}>
            <MenuBar isOpen={isOpen} />
          </MobileMenuButton>

        <NavContent isOpen={isOpen}>
          <NavLinks>
            <NavLink 
              href="/statistics"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
            >
              통계
            </NavLink>
            <NavLink 
              href="/inquiries"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
            >
              문의내역
            </NavLink>
          </NavLinks>
          <ButtonContainer>
            <NavButton 
              href="/"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
            >
              포트폴리오
            </NavButton>
            <LogoutButton
              onClick={onLogout}
              href='/'
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              로그아웃
            </LogoutButton>
          </ButtonContainer>
        </NavContent>
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
  margin: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavButton = styled(MotionLink)`
  padding: 0.8rem 1.5rem;
  background: transparent;
  color: #007bff;
  border: 2px solid #007bff;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  miln-width: 110px;

  &:hover {
    background: rgba(0, 123, 255, 0.1);
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
  }
`;

const LogoutButton = styled(MotionLink)`
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
  white-space: nowrap;
  min-width: 110px; 
  text-align: center;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  margin-right: auto; 

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const NavLink = styled(MotionLink)`
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  font-size: 1.1rem;
  white-space: nowrap;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuBar = styled.div<MenuBarProps>`
  width: 25px;
  height: 2px;
  background: #333;
  position: relative;
  transition: all 0.3s ease;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 2px;
    background: #333;
    transition: all 0.3s ease;
  }

  &::before {
    transform: ${props => props.isOpen ? 'rotate(45deg)' : 'translateY(-8px)'};
  }

  &::after {
    transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'translateY(8px)'};
  }

  background: ${props => props.isOpen ? 'transparent' : '#333'};
`;

const NavContent = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 80%;
    height: 100vh;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    padding: 80px 20px;
    transition: right 0.3s ease;
    box-shadow: ${props => props.isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

