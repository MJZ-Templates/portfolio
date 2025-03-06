'use client'

import { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styled from '@emotion/styled';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Projects from '@/components/home/Projects';
import Contact from '@/components/home/Contact';

// 일반 motion.div 스타일 설정
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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform to ensure framer-motion compatibility
  const scaleXStyle = useTransform(scaleX, value => `scaleX(${value})`);

  // 스크롤 시 부드러운 섹션 이동
  useEffect(() => {
    const smoothScroll = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      window.scrollBy({
        top: delta,
        behavior: 'smooth',
      });
    };

    window.addEventListener('wheel', smoothScroll, { passive: false });
    return () => window.removeEventListener('wheel', smoothScroll);
  }, []);

  return (
    <MainContainer>
      <ProgressBar style={{ transform: scaleXStyle }} />

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Hero />
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <About />
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Projects />
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Contact />
      </motion.section>

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

const MainContainer = styled.main`
  position: relative;
`;
