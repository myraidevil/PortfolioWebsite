import { ProjectAssets } from '~/constants/project-assets';

import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import config from '~/config.json';
import styles from './home.module.css';
import { Skills } from './skills';

const MyProjectsSection = lazy(() => import('./myproject-section'));

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

  const allProjects = [
    {
      id: 'project-1',
      category: 'Design',
      title: 'Task Mangement App',
      description: 'Design of a Task management app ',
      buttonText: 'Prototype',
      buttonLink:
        'https://www.figma.com/proto/67U4lehU27zOGgLbFZiahY/zidio?page-id=0%3A1&node-id=1-120&p=f&viewport=595%2C785%2C0.04&t=PRFbJmxCzB4SY0gq-1&scaling=scale-down&content-scaling=fixed',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '/taskmanager',
      imageSrc: '/app/assets/taskmanger.png',
      skills: [
        'Figma',
        'Information Architecture',
        'Adobe Suits',
        'Product Life Cycle',
        'MIRO',
        'Prototyping',
        'UI/UX',
      ],
    },
    {
      id: 'project-2',
      category: 'Design',
      title: 'Learning Management System',
      description: 'Design of a Learning Mangament System',
      buttonText: 'Prototype',
      buttonLink:
        'https://www.figma.com/proto/9F5Owt3WPTkDmG7hQkzkQK/Learning-Platform?page-id=0%3A1&node-id=69-551&p=f&viewport=236%2C118%2C0.02&t=OkbH97f7Ei8hK8dh-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=69%3A551',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '/learningplatform',
      imageSrc: '/app/assets/LearningPlatform.png',
      skills: [
        'Information Architecture (IA)',
        'Gamification',
        'Social Learning',
        'Figma',
        'Design System',
        'Product Life Cycle',
        'Prototyping',
        'UI/UX',
      ],
    },
    {
      id: 'project-5',
      category: 'Development',
      title: 'QTripStatic',
      description:
        'Created 3 different web pages from Wireframe layout using HTML and CSS ,Utilized Bootstrap extensively for responsive design, Deployed the website to Netlify/Vercel',
      buttonText: 'View',
      buttonLink: '/qtripstatic',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '/qtripstatic',
      imageSrc: 'https://directus.crio.do/assets/4b996c66-44a8-49d6-bba3-684225f7cd21?',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'UI/UX'],
    },
    {
      id: 'project-6',
      category: 'Development',
      title: 'QtripStatic',
      description:
        'Empowering international students to achieve their U.S. study dreams — the right way.',
      buttonText: 'View',
      buttonLink: '/qtripstatic',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '/qtripstatic',
      imageSrc: ProjectAssets.SpringFallSecondTexture,
      skills: ['Next.js', 'Tailwind CSS', 'Motion UI'],
    },
    {
      id: 'project-7',
      category: 'Design',
      title: 'Featured Coolest Projects.',
      description: 'A look at my most creative and high-impact work.',
      buttonText: 'View',
      buttonLink: 'https://instagram.com/myraidevil',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '#',
      imageSrc: ProjectAssets.CoolestProjectsTexure,
      skills: ['Figma', 'UI Design', 'Prototyping'],
    },
    {
      id: 'project-8',
      category: 'Development',
      title: 'BlockVerse Prototype.',
      description: 'Next-gen decentralized world experience design.',
      buttonText: 'View',
      buttonLink: 'https://instagram.com/dev_xora',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '#',
      imageSrc: ProjectAssets.blockverseFirstTexture,
      skills: ['React Three Fiber', 'Web3', 'Shader Design'],
    },
    {
      id: 'project-9',
      category: 'Design',
      title: 'BlockVerse zz.',
      description: 'Next-gen decentralized world experience design.',
      buttonText: 'View',
      buttonLink: 'https://instagram.com/dev_xora',
      secondaryButtonText: 'Details',
      secondaryButtonLink: '#',
      imageSrc: ProjectAssets.CoolestProjectsTexure,
      skills: ['Branding', 'Typography', 'Color Systems'],
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

      <MyProjectsSection projects={allProjects} />

      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
