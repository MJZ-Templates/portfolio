'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styled from '@emotion/styled';
import Home from '@/app/home';
import About from '@/app/about';
import Projects from '@/app/projects';
import Contact from '@/app/contact';
import { Link as ScrollLink, Element } from 'react-scroll';

export default function Main() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform to ensure framer-motion compatibility
  const scaleXStyle = useTransform(scaleX, value => `scaleX(${value})`);

  const [ip, setIp] = useState('');

  useEffect(() => {
    fetch('/api/get-ip')
      .then((res) => res.json())
      .then((data) => {
        console.log('User IP:', data.ip);
        setIp(data.ip);
      })
      .catch((error) => console.error('Error fetching IP:', error));
  }, []);

  return (
    <MainContainer>
      <ProgressBar style={{ transform: scaleXStyle }} />

      <Element name="homeSection">
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Home />
        </motion.section>
      </Element>

      <Element name="aboutSection">
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <About />
        </motion.section>
      </Element>

      <Element name="projectsSection">
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Projects />
        </motion.section>
      </Element>

      <Element name="contactSection">
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Contact />
        </motion.section>
      </Element>

      <ScrollToTopButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        ↑
      </ScrollToTopButton>
    </MainContainer>
  );
}

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #007bff;
  transform-origin: 0%;
  z-index: 1000;
`;

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;

  &:hover {
    background: #0056b3;
  }
`;

const MainContainer = styled.main`
  position: relative;
`;
