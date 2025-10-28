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

import MyProjectsSection from './myproject-section'; // Import the new section
import { FaPlaceOfWorship } from 'react-icons/fa';

export const links = () => [
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

export const meta = () =>
  baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  const intro = useRef();
  const skillsRef = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, skillsRef, details];

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

    sections.forEach(section => {
      if (section.current) sectionObserver.observe(section.current);
    });

    if (intro.current) indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Your existing projects data with categories
  const allProjects = [
    {
      id: 'project-1',
      category: 'Development',
      title: 'Turning Chaos into Clarity. Tasks into Triumphs.',
      description: 'Automate. Prioritize. Achieve — with Zidio Task Management.',
      buttonText: 'View',
      buttonLink:
        'https://www.behance.net/gallery/231215799/Zidio-task-Mangement-Web-App',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '#',
      imageSrc: dashboard,
    },
    {
      id: 'project-2',
      category: 'Develpment',
      title: 'Turning Aspirations into Admissions.',
      description:
        'Empowering international students to achieve their U.S. study dreams — the right way.',
      buttonText: 'View',
      buttonLink: 'https://spring-fall.vercel.app/',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '#',
      imageSrc: SpringFallSecondTexture,
    },
    {
      id: 'project-3',
      category: 'Design',
      title: 'Featured Coolest Projects.',
      description: 'A look at my most creative and high-impact work.',
      buttonText: 'view',
      buttonLink: 'https://instagram.com/myraidevil',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '#',
      imageSrc: CoolestProjectsTexure,
    },
    {
      id: 'project-4',
      category: 'Development',
      title: 'BlockVerse Prototype.',
      description: 'Next-gen decentralized world experience design.',
      buttonText: 'view',
      buttonLink: 'https://instagram.com/dev_xora',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '#',
      imageSrc: blockverseFirstTexture,
    },
    {
      id: 'project-5',
      category: 'Design',
      title: 'BlockVerse zz.',
      description: 'Next-gen decentralized world experience design.',
      buttonText: 'view',
      buttonLink: 'https://instagram.com/dev_xora',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '#',
      imageSrc: FaPlaceOfWorship,
    },
  ];

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <Skills
        sectionRef={skillsRef}
        visible={visibleSections.includes(skillsRef.current)}
      />

      {/* My Projects Section with Tabs */}
      <MyProjectsSection projects={allProjects} />

      {/* Existing content here if needed */}

      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
