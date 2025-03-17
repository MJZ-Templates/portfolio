import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import MotionLink from '@/components/CustomLink';
import { useRouter } from "next/navigation";

interface NavigationProps {}
interface MenuBarProps {
  isOpen: boolean;
}

export const Navigation = ({}: NavigationProps) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']);
  const boxShadow = useTransform(scrollY, [0, 50], ['none', '0 5px 15px rgba(0, 0, 0, 0.1)']);

  useEffect(() => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    setIsLoggedIn(!!accessToken);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <Nav style={{ backgroundColor, boxShadow }} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <NavContainer>
        <Logo href="#home" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Portfolio
        </Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          <MenuBar isOpen={isOpen} />
        </MobileMenuButton>

        <NavList isOpen={isOpen}>
          {navItems.map((item) => (
            <NavItem key={item}>
              <NavLink 
                href={`/#${item.toLowerCase()}`} 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
              >
                {item}
                <LinkHighlight initial={{ width: '0%' }} whileHover={{ width: '100%' }} transition={{ duration: 0.3 }} />
              </NavLink>
            </NavItem>
          ))}
          {isLoggedIn ? (
            <>
              <MobileAuthLink 
                href="/statistics" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                My Page
              </MobileAuthLink>
              <MobileAuthButton 
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </MobileAuthButton>
            </>
          ) : (
            <MobileAuthLink 
              href="/login" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              Login
            </MobileAuthLink>
          )}
        </NavList>

        {isLoggedIn ? (
          <DesktopAuthContainer>
            <DesktopAuthLink 
              href="/statistics" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              My Page
            </DesktopAuthLink>
            <DesktopAuthButton 
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </DesktopAuthButton>
          </DesktopAuthContainer>
        ) : (
          <DesktopAuthLink 
            href="/login" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            Login
          </DesktopAuthLink>
        )}
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
  background: ${theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavList = styled.ul<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    background: ${theme.colors.background.white};
    padding: 80px 20px;
    transition: right 0.3s ease;
    box-shadow: ${props => props.isOpen ? `-5px 0 15px ${theme.colors.shadow.secondary}` : 'none'};
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(MotionLink)`
  text-decoration: none;
  color: ${theme.colors.text.primary};
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  padding: 0.5rem 0;
  display: inline-block;
`;

const LinkHighlight = styled(motion.span)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: ${theme.colors.gradient.primary};
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
  background: ${theme.colors.text.primary};
  position: relative;
  transition: all 0.3s ease;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 2px;
    background: ${theme.colors.text.primary};
    transition: all 0.3s ease;
  }

  &::before {
    transform: ${props => props.isOpen ? 'rotate(45deg)' : 'translateY(-8px)'};
  }

  &::after {
    transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'translateY(8px)'};
  }

  background: ${props => props.isOpen ? 'transparent' : theme.colors.text.primary};
`;

const authButtonStyles = `
  padding: 0.8rem 1.5rem;
  background: ${theme.colors.gradient.button};
  color: ${theme.colors.background.white};
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: 0 4px 15px ${theme.colors.shadow.primary};
  border: none;
  cursor: pointer;
`;

const DesktopAuthContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopAuthButton = styled(motion.button)`
  ${authButtonStyles}

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopAuthLink = styled(MotionLink)`
  ${authButtonStyles}

  @media (max-width: 768px) {
    display: none;
  }
`;

const mobileAuthStyles = `
  ${authButtonStyles}
  display: none;
  text-align: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileAuthButton = styled(motion.button)`
  ${mobileAuthStyles}
`;

const MobileAuthLink = styled(MotionLink)`
  ${mobileAuthStyles}
`;