import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import blockverseFirstTexture from '~/assets/blockVerseFirstTexture.png';
import SpringFallSecondTexture from '~/assets/SpringFallSecondTexture.png';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import CoolestProjectsTexure from '~/assets/CoolestProjectsTexure.png';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import dashboard from '~/assets/dashboard.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';
import { Skills } from './skills';

// Prefetch draco decoder wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();
  const skillsRef = useRef();

  useEffect(() => {
    const sections = [
      intro,
      skillsRef,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      details,
    ];

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

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => setScrollIndicatorHidden(!entry.isIntersecting),
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => sectionObserver.observe(section.current));
    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      {/* Intro Section */}
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      {/* Skills Section */}
      <Skills
        sectionRef={skillsRef}
        visible={visibleSections.includes(skillsRef.current)}
      />

      {/* Works Section */}

      {/* Project 1 */}
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Turning Chaos into Clarity. Tasks into Triumphs."
        description="Automate. Prioritize. Achieve — with Zidio Task Management."
        buttonText="View Project"
        buttonLink="https://www.behance.net/gallery/231215799/Zidio-task-Mangement-Web-App"
        secondaryButtonText="Details"
        secondaryButtonLink="#"
        imageSrc={dashboard}
      />

      {/* Project 2 */}
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Turning Aspirations into Admissions."
        description="Empowering international students to achieve their U.S. study dreams — the right way."
        buttonText="Visit Project"
        buttonLink="https://spring-fall.vercel.app/"
        secondaryButtonText="Details"
        secondaryButtonLink="#"
        imageSrc={SpringFallSecondTexture}
      />

      {/* Project 3 */}
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Featured Coolest Projects."
        description="A look at my most creative and high-impact work."
        buttonText="Visit"
        buttonLink="https://instagram.com/myraidevil"
        secondaryButtonText="Details"
        secondaryButtonLink="#"
        imageSrc={CoolestProjectsTexure}
      />

      {/* Project 4 */}
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Featured Coolest Projects."
        description="A look at my most creative and high-impact work."
        buttonText="Visit"
        buttonLink="https://instagram.com/dev_xora"
        secondaryButtonText="Details"
        secondaryButtonLink="#"
        imageSrc={blockverseFirstTexture}
      />

      {/* Profile & Footer */}
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
