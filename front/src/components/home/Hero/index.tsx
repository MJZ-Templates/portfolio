'use client'

import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <HeroSection>
      <ContentWrapper>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          안녕하세요 저는 [이름]입니다.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          프론트엔드 개발자입니다
        </motion.p>
      </ContentWrapper>
    </HeroSection>
  )
}

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContentWrapper = styled.div`
  text-align: center;
`

export default Hero