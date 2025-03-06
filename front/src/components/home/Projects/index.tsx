'use client'

import Image from 'next/image';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import project_1 from '/public/images/projects/project1.png';

interface ProjectProps {}

const Projects = ({}: ProjectProps) => {
  const projects = [
    {
      id: 1,
      title: "프로젝트 1",
      description: "프로젝트에 대한 자세한 설명을 추가하세요. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 등을 설명합니다.",
      image: project_1.src,
      technologies: ["React", "TypeScript", "Node.js"],
      github: "https://github.com/COKOTHON-TEAM5/Team5-iOS",
      demo: "https://github.com/COKOTHON-TEAM5/Team5-iOS"
    },
    // 더 많은 프로젝트 추가
  ];

  return (
    <ProjectsSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Container>
        <Title
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Projects
        </Title>
        <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <ImageWrapper>
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </ImageWrapper>
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.technologies.map((tech) => (
                  <TechTag
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </TechTag>
                ))}
              </TechStack>
              <Links>
                <Link
                  href={project.github}
                  target="_blank"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  GitHub
                </Link>
                <Link
                  href={project.demo}
                  target="_blank"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Live Demo
                </Link>
              </Links>
            </ProjectInfo>
          </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;

// 애니메이션 변수
const fadeInUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

const ProjectsSection = styled(motion.section)`
  padding: 120px 0;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
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

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 40px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled(motion.div)`
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0,123,255,0.1), rgba(0,255,136,0.1));
    transition: all 0.3s ease;
  }

  ${ProjectCard}:hover &::after {
    background: linear-gradient(135deg, rgba(0,123,255,0.2), rgba(0,255,136,0.2));
  }
`;

const ProjectInfo = styled.div`
  padding: 30px;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: linear-gradient(to right, #007bff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProjectDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
`;

const TechTag = styled(motion.span)`
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
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Link = styled(motion.a)`
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  padding: 12px 25px;
  border-radius: 12px;
  background: linear-gradient(135deg, #007bff10, #00ff8810);
  transition: all 0.3s ease;
  flex: 1;
  text-align: center;
  
  &:hover {
    background: linear-gradient(135deg, #007bff, #00ff88);
    color: white;
    text-decoration: none;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.2);
  }
`;