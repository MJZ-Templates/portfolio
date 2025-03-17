"use client";

import styled from "@emotion/styled";
import theme from "@/styles/theme";
import Image from "next/image";
import { motion } from "framer-motion";
import project_1 from "/public/images/projects/project1.png";
import project_2 from "/public/images/projects/project2.png";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiMongodb } from "react-icons/si";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: { name: string; icon: JSX.Element }[];
  github: string;
  demo: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Project 1",
    description:
      "Add detailed descriptions of the project, explain what problems were solved, and what technologies were used.",
    image: project_1.src,
    technologies: [
      { name: "React", icon: <FaReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "MongoDB", icon: <SiMongodb /> },
    ],
    github: "https://github.com/COKOTHON-TEAM5/Team5-iOS",
    demo: "https://github.com/COKOTHON-TEAM5/Team5-iOS",
  },
  {
    id: 2,
    title: "Project 2",
    description:
      "This project is a comprehensive analysis tool for real-time data streaming.",
    image: project_2.src,
    technologies: [
      { name: "React", icon: <FaReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "MongoDB", icon: <SiMongodb /> },
    ],
    github: "https://github.com/dummy-project-2",
    demo: "https://github.com/dummy-project-2",
  },
];

export const Projects = () => {
  return (
    <ProjectsSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      id="projects"
    >
      <Container>
        <Title
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Projects
        </Title>
        <ScrollableProjectWrapper>
          <ProjectGrid>
            {projectsData.map((project, index) => (
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
                        key={tech.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <TechContent>
                          {tech.icon}
                          <span>{tech.name}</span>
                        </TechContent>
                      </TechTag>
                    ))}
                  </TechStack>
                  <Links>
                    <Link
                      href={project.github}
                      target="_blank"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 4px 15px rgba(0, 123, 255, 0.2)",
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
                        boxShadow: "0 4px 15px rgba(0, 123, 255, 0.2)",
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
        </ScrollableProjectWrapper>
      </Container>
    </ProjectsSection>
  );
};

const ProjectsSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  padding: 60px 0;
  background: ${theme.colors.gradient.section};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 3rem;
  font-weight: 700;
  background: ${theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ScrollableProjectWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.scrollbar.track};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.scrollbar.thumb};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.scrollbar.thumbHover};
  }
`;

const ProjectGrid = styled(motion.div)`
  display: flex;
  gap: 40px;
  padding: 20px 10px;

  &::before,
  &::after {
    content: "";
    min-width: 20px;
  }
`;

const ProjectCard = styled(motion.div)`
  flex: 0 0 auto;
  width: 350px;
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 30px ${theme.colors.shadow.secondary};
  transition: all 0.3s ease;
  max-height: 800px;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${theme.colors.shadow.secondary};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.colors.gradient.card.overlay};
    transition: all 0.3s ease;
  }

  ${ProjectCard}:hover &::after {
    background: ${theme.colors.gradient.card.overlayHover};
  }
`;

const ProjectInfo = styled.div`
  padding: 30px;
  background: ${theme.colors.gradient.card.info};
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: ${theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProjectDescription = styled.p`
  color: ${theme.colors.text.secondary};
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
  background: ${theme.colors.background.primary};
  color: ${theme.colors.primary};
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  align-items: center;

  &:hover {
    background: ${theme.colors.background.white};
    border-color: ${theme.colors.primary};
    box-shadow: 0 4px 15px ${theme.colors.shadow.skill};
  }

  svg {
    margin-right: 5px;
    font-size: 1.2rem;
  }
`;

const TechContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Link = styled(motion.a)`
  text-decoration: none;
  color: ${theme.colors.primary};
  font-weight: 500;
  padding: 12px 25px;
  border-radius: 12px;
  background: ${theme.colors.gradient.card.link};
  transition: all 0.3s ease;
  flex: 1;
  text-align: center;

  &:hover {
    background: ${theme.colors.gradient.primary};
    color: ${theme.colors.background.white};
    text-decoration: none;
    box-shadow: 0 4px 15px ${theme.colors.shadow.primary};
  }
`;
