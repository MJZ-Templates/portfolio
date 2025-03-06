import Image from 'next/image';
import styled from '@emotion/styled';

import project_1 from '/public/images/projects/project1.png';

interface ProjectProps {}

const ProjectsSection = styled.section`
  padding: 100px 0;
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
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background: white; 
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectInfo = styled.div`
  padding: 20px;
`;

const ProjectTitle = styled.h3`
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  margin-bottom: 15px;
  color: #666;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const TechTag = styled.span`
  background-color: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #007bff;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Projects = ({}: ProjectProps) => {
  const projects = [
    {
      id: 1,
      title: "프로젝트 1",
      description: "프로젝트 설명",
      image: project_1.src,
      technologies: ["React", "TypeScript", "Node.js"],
      github: "https://github.com/COKOTHON-TEAM5/Team5-iOS",
      demo: "https://github.com/COKOTHON-TEAM5/Team5-iOS"
    },
    // 더 많은 프로젝트 추가
  ];

  return (
    <ProjectsSection id="projects">
      <Container>
        <Title>Projects</Title>
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id}>
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
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </TechStack>
                <Links>
                  <Link href={project.github} target="_blank">GitHub</Link>
                  <Link href={project.demo} target="_blank">Live Demo</Link>
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
