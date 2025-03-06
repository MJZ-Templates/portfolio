'use client'

import styled from '@emotion/styled'
import { motion } from 'framer-motion'

interface StyledButtonProps {
  secondary: boolean;  
}

const Hero = () => {
  return (
    <HeroSection
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
            반갑습니다
          </Greeting>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            안녕하세요 저는{' '}
            <HighlightText>
              [이름]
            </HighlightText>
            입니다.
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            프론트엔드 개발자
          </Subtitle>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            창의적인 웹 경험을 만들어내는 개발자입니다
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
              secondary={ false }
            >
              프로젝트 보기
            </StyledButton>
            <StyledButton
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              secondary={ true }
            >
              연락하기
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
    </HeroSection>
  )
}

const HeroSection = styled(motion.section)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(0,123,255,0.1), transparent 70%),
              radial-gradient(circle at bottom left, rgba(0,255,136,0.1), transparent 70%);
`

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`

const TextContainer = styled.div`
`

const Greeting = styled(motion.p)`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 20px;
`

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HighlightText = styled.span`
  background: linear-gradient(to right, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  background: linear-gradient(to right, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
`

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
`

const StyledButton = styled(motion.a)<StyledButtonProps>`
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  ${({ secondary }: StyledButtonProps) => secondary ? `  
    background: transparent;
    border: 2px solid #007bff;
    color: #007bff;

    &:hover {
      background: linear-gradient(135deg, #007bff20, #00ff8820);
    }
  ` : `
    background: linear-gradient(135deg, #007bff, #00ff88);
    color: white;
    border: none;

    &:hover {
      box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
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
  color: #666;
`

const ScrollIcon = styled.span`
  font-size: 1.5rem;
  color: #007bff;
`

export default Hero