'use client'

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaJsSquare, FaReact, FaAngular, FaVuejs } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs } from 'react-icons/si';

interface AboutProps {}

const About = ({}: AboutProps) => {
  return (
    <AboutSection 
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Container>
        <Title
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          About Me
        </Title>
        <Content>
          <ImageContainer
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ImageWrapper>
              <Image
                src="/images/profile/user.png"
                alt="Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </ImageWrapper>
          </ImageContainer>
          <DescriptionContainer
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <DescriptionCard>
              <IntroText>안녕하세요! 저는</IntroText>
              <HighlightText>프론트엔드 개발자</HighlightText>
              <Description>
                <p>
                  창의적이고 문제 해결을 좋아하는 프론트엔드 개발자입니다.
                  사용자 경험을 중요시하며, 더 나은 웹 애플리케이션을 개발하는 데 
                  열정을 가지고 있습니다.
                </p>
                <p>
                  지속적인 학습과 성장에 중점을 두고 있으며, 새로운 
                  기술 트렌드를 따라가는 것을 좋아합니다.
                </p>
              </Description>
              <SkillsContainer>
                <SkillsTitle>Technical Skills</SkillsTitle>
                <SkillsList>
                  <SkillTag>
                    <FaJsSquare />
                    JavaScript
                  </SkillTag>
                  <SkillTag>
                    <SiTypescript />
                    TypeScript
                  </SkillTag>
                  <SkillTag>
                    <FaReact />
                    React
                  </SkillTag>
                  <SkillTag>
                    <SiNextdotjs />
                    Next.js
                  </SkillTag>
                </SkillsList>
              </SkillsContainer>
            </DescriptionCard>
          </DescriptionContainer>
        </Content>
      </Container>
    </AboutSection>
  );
};

const AboutSection = styled(motion.section)`
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 60px;
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(to right, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 150px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 123, 255, 0.15);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const DescriptionContainer = styled(motion.div)``;

const DescriptionCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 10px;
`;

const HighlightText = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 20px;
  background: linear-gradient(to right, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 20px;

  p {
    margin-bottom: 15px;
  }
`;

const SkillsContainer = styled.div`
  margin-top: 30px;
`;

const SkillsTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkillTag = styled(motion.span)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f9fa;
  color: #007bff;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: white;
    border-color: #007bff;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.1);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export default About;
