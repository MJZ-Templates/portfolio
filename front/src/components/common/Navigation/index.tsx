// components/Navigation/Navigation.tsx
'use client'

import styled from "@emotion/styled";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from 'react';

interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // 스크롤에 따른 배경 투명도 조절
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 50],
    ["none", "0 5px 15px rgba(0, 0, 0, 0.1)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav
      style={{ backgroundColor, boxShadow }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContainer>
        <Logo
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Portfolio
        </Logo>
        <NavList>
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <NavItem key={item}>
              <NavLink 
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                <LinkHighlight 
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </NavLink>
            </NavItem>
          ))}
        </NavList>
        <ContactButton
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </ContactButton>
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

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(motion.a)`
  text-decoration: none;
  color: #333;
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
  background: linear-gradient(to right, #007bff, #00ff88);
`;

const ContactButton = styled(motion.a)`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #007bff, #00ff88);
  color: white;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.2);

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Navigation;