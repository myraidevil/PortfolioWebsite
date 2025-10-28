import { useEffect, useRef, useState } from 'react';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Footer } from '~/components/footer';
import { ProjectSummary } from '~/routes/home/project-summary';
import styles from './projects.module.css';

// Placeholder textures (replace with your actual assets)
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import blockverseFirstTexture from '~/assets/blockVerseFirstTexture.png';
import SpringFallSecondTexture from '~/assets/SpringFallSecondTexture.png';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import CoolestProjectsTexure from '~/assets/CoolestProjectsTexure.png';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import dashboard from '~/assets/dashboard.png';

export const Projects = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();

  useEffect(() => {
    const sections = [projectOne, projectTwo, projectThree];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prev => [...prev, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    sections.forEach(section => sectionObserver.observe(section.current));

    return () => sectionObserver.disconnect();
  }, [visibleSections]);

  return (
    <Section className={styles.projects}>
      <Heading level={2} as="h1" className={styles.title} data-visible={true}>
        My Projects
      </Heading>

      <div className={styles.projectsList}>
        <ProjectSummary
          id="project-1"
          sectionRef={projectOne}
          visible={visibleSections.includes(projectOne.current)}
          index={1}
          title="Turning Chaos into Clarity. Tasks into Triumphs."
          description="Automate. Prioritize. Achieve — with Zidio Task Management."
          buttonText="View Project"
          buttonLink="https://www.behance.net/gallery/231215799/Zidio-task-Mangement-Web-App"
          model={{
            type: 'laptop',
            alt: 'Smart Sparrow lesson builder',
            textures: [
              {
                srcSet: `${dashboard} 1280w, ${dashboard} 2560w`,
                placeholder: sprTexturePlaceholder,
              },
            ],
          }}
        />

        <ProjectSummary
          id="project-2"
          sectionRef={projectTwo}
          visible={visibleSections.includes(projectTwo.current)}
          index={2}
          title="Turning Aspirations into Admissions."
          description="Empowering international students to achieve their U.S. study dreams — the right way."
          buttonText="Visit Project"
          buttonLink="https://spring-fall.vercel.app/"
          model={{
            type: 'phone',
            alt: 'App login screen',
            textures: [
              {
                srcSet: `${SpringFallSecondTexture} 375w, ${SpringFallSecondTexture} 750w`,
                placeholder: gamestackTexture2Placeholder,
              },
              {
                srcSet: `${blockverseFirstTexture} 375w, ${blockverseFirstTexture} 750w`,
                placeholder: gamestackTexturePlaceholder,
              },
            ],
          }}
        />

        <ProjectSummary
          id="project-3"
          sectionRef={projectThree}
          visible={visibleSections.includes(projectThree.current)}
          index={3}
          title="Featured Coolest Projects."
          description="A look at my most creative and high-impact work."
          buttonText="Visit"
          buttonLink="https://instagram.com/myraidevil"
          model={{
            type: 'laptop',
            alt: 'Annotating a biomedical image in the Slice app',
            textures: [
              {
                srcSet: `${CoolestProjectsTexure} 800w, ${CoolestProjectsTexure} 1920w`,
                placeholder: sliceTexturePlaceholder,
              },
            ],
          }}
        />
      </div>
      <Footer />
    </Section>
  );
};
