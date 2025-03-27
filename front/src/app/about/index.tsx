"use client";

import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaJsSquare, FaReact } from "react-icons/fa";
import { SiTypescript, SiNextdotjs } from "react-icons/si";

interface AboutProps {}

// Enter your information
export const About = ({}: AboutProps) => {
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
                sizes="(max-width: 768px) 100vw, 300px"
                style={{ objectFit: "cover" }}
                priority
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
              <IntroText>Hello! I am a</IntroText>
              <HighlightText>Frontend Developer</HighlightText>
              <Description>
                <p>
                  I am a creative and problem-solving frontend developer. I
                  prioritize user experience and am passionate about developing
                  better web applications.
                </p>
                <p>
                  I focus on continuous learning and growth and enjoy keeping up
                  with new technology trends.
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
  padding: 60px 0;
  background: ${theme.colors.gradient.background};
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
  background: ${theme.colors.gradient.primary};
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
  box-shadow: 0 20px 40px ${theme.colors.shadow.primary};

  &::after {
    content: "";
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
  box-shadow: 0 10px 30px ${theme.colors.shadow.secondary};
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 10px;
`;

const HighlightText = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 20px;
  background: ${theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${theme.colors.text.secondary};
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
  color: ${theme.colors.text.primary};
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
  background: ${theme.colors.background.primary};
  color: ${theme.colors.primary};
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: ${theme.colors.background.white};
    border-color: ${theme.colors.primary};
    box-shadow: 0 4px 15px ${theme.colors.shadow.skill};
  }

  svg {
    font-size: 1.2rem;
  }
`;
