"use client";

import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { PostContactRequest } from "@/shared/contact/type";
import { postContactMessage } from "@/shared/contact";

export const Contact = () => {
  const [formState, setFormState] = useState<PostContactRequest>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postContactMessage(formState);
      if (response.data) {
        alert("Message sent successfully!");
        window.location.reload();
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("An error occurred while sending the message.");
    }
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
            <Subtitle>
              Feel free to reach out for collaborations or just a friendly hello
              👋
            </Subtitle>
            <ContactInfo>
              <ContactItem>
                <IconWrapper>
                  <FaEnvelope />
                </IconWrapper>
                <div>
                  <ItemTitle>Email</ItemTitle>
                  <ItemText>your.email@example.com</ItemText>
                </div>
              </ContactItem>
              <ContactItem>
                <IconWrapper>
                  <FaMapMarkerAlt />
                </IconWrapper>
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
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
                <InputFocus />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                />
                <InputFocus />
              </FormGroup>
              <FormGroup>
                <TextArea
                  placeholder="Your Message"
                  rows={6}
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
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
  background: ${theme.colors.gradient.background};
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
  background: ${theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
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
  background: ${theme.colors.background.white};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px ${theme.colors.shadow.secondary};
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 5px;
`;

const ItemText = styled.p`
  color: ${theme.colors.text.secondary};
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
  color: ${theme.colors.primary};
  font-weight: 500;
  padding: 10px 25px;
  border-radius: 25px;
  border: 2px solid ${theme.colors.primary};
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.background.white};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const FormSection = styled.div`
  background: ${theme.colors.background.white};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px ${theme.colors.shadow.secondary};
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
  border: 2px solid ${theme.colors.input.border};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${theme.colors.background.primary};
  box-sizing: border-box;

  &::placeholder {
    font-size: 1rem;
    font-family: Arial, sans-serif;
    color: ${theme.colors.input.placeholder};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.background.white};
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid ${theme.colors.input.border};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${theme.colors.background.primary};
  resize: vertical;
  box-sizing: border-box;

  &::placeholder {
    font-size: 1rem;
    font-family: Arial, sans-serif;
    color: ${theme.colors.input.placeholder};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.background.white};
    outline: none;
  }
`;

const InputFocus = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: ${theme.colors.primary};
  transition: width 0.3s ease;
`;

const SubmitButton = styled(motion.button)`
  padding: 15px 30px;
  background: ${theme.colors.gradient.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px ${theme.colors.shadow.primary};
  }
`;
