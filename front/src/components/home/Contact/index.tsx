'use client'

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

interface ContactProps {}

const Contact = ({}: ContactProps) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직 구현
    console.log(formState);
  };

  return (
    <ContactSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      id="contact"
    >
      <Container>
        <ContentWrapper>
          <InfoSection>
            <Title
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              Let's Connect
            </Title>
            <Subtitle>Feel free to reach out for collaborations or just a friendly hello 👋</Subtitle>
            <ContactInfo>
              <ContactItem>
                <IconWrapper><FaEnvelope /></IconWrapper>
                <div>
                  <ItemTitle>Email</ItemTitle>
                  <ItemText>your.email@example.com</ItemText>
                </div>
              </ContactItem>
              <ContactItem>
                <IconWrapper><FaMapMarkerAlt /></IconWrapper>
                <div>
                  <ItemTitle>Location</ItemTitle>
                  <ItemText>Seoul, South Korea</ItemText>
                </div>
              </ContactItem>
              <SocialLinks>
                <SocialLink 
                  href="https://github.com/yourusername" 
                  target="_blank"
                  whileHover={{ y: -5 }}
                >
                  <FaGithub /> GitHub
                </SocialLink>
                <SocialLink 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank"
                  whileHover={{ y: -5 }}
                >
                  <FaLinkedin /> LinkedIn
                </SocialLink>
              </SocialLinks>
            </ContactInfo>
          </InfoSection>

          <FormSection>
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
                <InputFocus />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                />
                <InputFocus />
              </FormGroup>
              <FormGroup>
                <TextArea
                  placeholder="Your Message"
                  rows={6}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
                <InputFocus />
              </FormGroup>
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </SubmitButton>
            </ContactForm>
          </FormSection>
        </ContentWrapper>
      </Container>
    </ContactSection>
  );
};

const ContactSection = styled(motion.section)`
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  
  @media (min-width: 968px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoSection = styled.div`
  padding-right: 40px;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(to right, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const ItemText = styled.p`
  color: #666;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  padding: 10px 25px;
  border-radius: 25px;
  border: 2px solid #007bff;
  transition: all 0.3s ease;
  
  &:hover {
    background: #007bff;
    color: white;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const FormSection = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const FormGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  box-sizing: border-box;
  
  &:focus {
    border-color: #007bff;
    background: white;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    border-color: #007bff;
    background: white;
    outline: none;
  }
`;

const InputFocus = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #007bff;
  transition: width 0.3s ease;
`;

const SubmitButton = styled(motion.button)`
  padding: 15px 30px;
  background: linear-gradient(135deg, #007bff, #00ff88);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
  }
`;

export default Contact;
