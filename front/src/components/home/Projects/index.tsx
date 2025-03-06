'use client'

import styled from '@emotion/styled';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';

// 스타일드 컴포넌트에 motion 타입 추가
const MotionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #333;
`;

const MotionProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  perspective: 1000px;
`;

const MotionProjectCard = styled(motion.div)`
  border-radius: 15px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
}

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const projects: Project[] = [
    {
      id: 1,
      title: "프로젝트 1",
      description: "프로젝트 설명",
      image: "/images/projects/project1.png",
      technologies: ["React", "TypeScript", "Node.js"],
      github: "https://github.com/example",
      demo: "https://example.com"
    },
    // 더 많은 프로젝트 추가
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      y: 50,
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <ProjectsSection id="projects">
      <Container>
        <MotionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </MotionTitle>
        <MotionProjectGrid
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {projects.map((project) => (
            <MotionProjectCard
              key={project.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
              <ImageWrapper>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <MotionImageOverlay
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <OverlayContent>
                    <ViewButton href={project.demo} target="_blank">
                      View Demo
                    </ViewButton>
                  </OverlayContent>
                </MotionImageOverlay>
              </ImageWrapper>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.technologies.map((tech) => (
                    <MotionTechTag
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </MotionTechTag>
                  ))}
                </TechStack>
                <Links>
                  <MotionSocialLink 
                    href={project.github}
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </MotionSocialLink>
                  <MotionSocialLink 
                    href={project.demo}
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                  </MotionSocialLink>
                </Links>
              </ProjectInfo>
            </MotionProjectCard>
          ))}
        </MotionProjectGrid>
        <MotionScrollToTop
          to="hero"
          smooth={true}
          duration={500}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </MotionScrollToTop>
      </Container>
    </ProjectsSection>
  );
};

// 스타일드 컴포넌트
const ProjectsSection = styled.section`
  padding: 100px 0;
  background: #f8f9fa;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const MotionImageOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayContent = styled.div`
  text-align: center;
  color: white;
`;

const ViewButton = styled.a`
  padding: 10px 20px;
  background: white;
  color: #333;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const ProjectInfo = styled.div`
  padding: 20px;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.5rem;
  color: #333;
`;

const ProjectDescription = styled.p`
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const MotionTechTag = styled(motion.span)`
  background: #e9ecef;
  color: #495057;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
`;

const MotionSocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  background: #e7f5ff;
  transition: all 0.3s ease;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const MotionScrollToTop = styled(motion(ScrollLink))`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

export default Projects;