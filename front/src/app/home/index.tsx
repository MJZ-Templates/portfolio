'use client'

import styled from '@emotion/styled';
import theme from '@/styles/theme';
import isPropValid from '@emotion/is-prop-valid';
import { motion } from 'framer-motion';

interface StyledButtonProps {
  secondary?: boolean;  
}

export const Home = () => {
  return (
    <HomeSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="home"
    >
      <GradientOverlay />
      <ContentWrapper>
        <TextContainer>
          <Greeting
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Welcome
          </Greeting>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Hello, I am{' '}
            <HighlightText>
              Arkain
            </HighlightText>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Frontend Developer
          </Subtitle>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            I'm a developer creating creative web experiences.
          </Description>
          <ButtonContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <StyledButton
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </StyledButton>
            <StyledButton
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              secondary
            >
              Contact Me
            </StyledButton>
          </ButtonContainer>
        </TextContainer>
        <ScrollIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 1
          }}
        >
          <ScrollText>Scroll Down</ScrollText>
          <ScrollIcon>↓</ScrollIcon>
        </ScrollIndicator>
      </ContentWrapper>
    </HomeSection>
  );
};

const HomeSection = styled(motion.section)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${theme.colors.gradient.background};
  overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.gradient.overlay.primary},
              ${theme.colors.gradient.overlay.secondary};
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const TextContainer = styled.div``;

const Greeting = styled(motion.p)`
  font-size: 1.5rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 20px;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${theme.colors.text.primary};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HighlightText = styled.span`
  background: ${theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  background: ${theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
  align-items: center;
`;

const StyledButton = styled(motion.a, {
  shouldForwardProp: (prop) => isPropValid(prop)
})<StyledButtonProps>`
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  ${({ secondary }) =>
    secondary
      ? `
    background: transparent;
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primary};

    &:hover {
      background: ${theme.colors.gradient.hover};
    }
  `
      : `
    background: ${theme.colors.gradient.button};
    color: ${theme.colors.background.white};
    border: none;

    &:hover {
      box-shadow: 0 5px 15px ${theme.colors.shadow.primary};
    }
  `}
`;

const ScrollIndicator = styled(motion.div)`
  display: flex;
  position: absolute;
  margin-top: 80px;
  width: 100%;
  flex-direction: column;
  gap: 5px;
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
`;

const ScrollIcon = styled.span`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
`;
