'use client'

// components/Hero/Hero.tsx
import styled from "@emotion/styled"

interface HeroProps {}

const Hero = ({}: HeroProps) => {
  return (
    <HeroSection>
      <Container>
        <Title>안녕하세요, 저는 [이름]입니다</Title>
        <Subtitle>Frontend Developer</Subtitle>
      </Container>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #666;
  text-align: center;
`;

export default Hero;