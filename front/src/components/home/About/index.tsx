'use client'

// components/About/About.tsx
import styled from '@emotion/styled';

interface AboutProps {}

const About = ({}: AboutProps) => {
  return (
    <AboutSection id="about">
      <Container>
        <Title>About Me</Title>
        <Content>
          <ProfileImage src="/profile.jpg" alt="Profile" />
          <Description>
            <p>여기에 자기소개를 작성하세요.</p>
            <p>기술 스택, 경력, 교육 등을 포함할 수 있습니다.</p>
          </Description>
        </Content>
      </Container>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  padding: 100px 0;
  background-color: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
`;

const Description = styled.div`
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.6;
`;

export default About;