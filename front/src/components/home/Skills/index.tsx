'use client'

// components/Skills/Skills.tsx
import styled from '@emotion/styled';

interface SkillsProps {}

const Skills = ({}: SkillsProps) => {
  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
    backend: ["Node.js", "Express", "MongoDB"],
    tools: ["Git", "VS Code", "Figma"]
  };

  return (
    <SkillsSection id="skills">
      <Container>
        <Title>Skills</Title>
        <SkillsGrid>
          <SkillCategory>
            <CategoryTitle>Frontend</CategoryTitle>
            <SkillList>
              {skills.frontend.map((skill) => (
                <SkillItem key={skill}>{skill}</SkillItem>
              ))}
            </SkillList>
          </SkillCategory>
          <SkillCategory>
            <CategoryTitle>Backend</CategoryTitle>
            <SkillList>
              {skills.backend.map((skill) => (
                <SkillItem key={skill}>{skill}</SkillItem>
              ))}
            </SkillList>
          </SkillCategory>
          <SkillCategory>
            <CategoryTitle>Tools</CategoryTitle>
            <SkillList>
              {skills.tools.map((skill) => (
                <SkillItem key={skill}>{skill}</SkillItem>
              ))}
            </SkillList>
          </SkillCategory>
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

const SkillsSection = styled.section`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const SkillCategory = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h3`
  margin-bottom: 20px;
  text-align: center;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  padding: 8px 0;
  text-align: center;
`;

export default Skills;