import { useEffect, useRef, useState } from 'react';
import styles from './mySkills.module.css';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFigma,
  SiAdobephotoshop,
  SiGithub,
} from 'react-icons/si';
import { FaMobileAlt, FaSitemap } from 'react-icons/fa';
import { MdAccessibility } from 'react-icons/md';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import config from '~/config.json';

// Skills organized by category
const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    skills: [
      {
        name: 'HTML5',
        icon: <SiHtml5 />,
        description: 'Markup foundation for structured and accessible web content.',
      },
      {
        name: 'CSS3',
        icon: <SiCss3 />,
        description: 'Styling responsive, visually appealing user interfaces.',
      },
      {
        name: 'JavaScript (ES6+)',
        icon: <SiJavascript />,
        description: 'Adds interactivity and logic to modern web applications.',
      },
      {
        name: 'React',
        icon: <SiReact />,
        description: 'Component-based library for building scalable UIs.',
      },
    ],
  },
  {
    category: 'Backend',
    skills: [
      {
        name: 'Node.js',
        icon: <SiNodedotjs />,
        description: 'JavaScript runtime for server-side development.',
      },
      {
        name: 'Express.js',
        icon: <SiExpress />,
        description: 'Minimalist framework for creating RESTful APIs.',
      },
      {
        name: 'MongoDB',
        icon: <SiMongodb />,
        description: 'NoSQL database for flexible data storage.',
      },
    ],
  },
  {
    category: 'Design & UI/UX',
    skills: [
      {
        name: 'Figma',
        icon: <SiFigma />,
        description: 'Design and prototype interfaces collaboratively.',
      },
      {
        name: 'Photoshop',
        icon: <SiAdobephotoshop />,
        description: 'Create and edit high-quality visual assets.',
      },
      {
        name: 'Wireframing & User Flows',
        icon: <FaSitemap />,
        description: 'Plan user journeys and interface structures.',
      },
    ],
  },
  {
    category: 'Workflow',
    skills: [
      {
        name: 'Git & GitHub',
        icon: <SiGithub />,
        description: 'Version control and collaborative development.',
      },
      {
        name: 'Responsive Design',
        icon: <FaMobileAlt />,
        description: 'Optimize layouts for all screen sizes.',
      },
      {
        name: 'Accessibility',
        icon: <MdAccessibility />,
        description: 'Ensure products are usable by everyone.',
      },
    ],
  },
];

export const meta = () =>
  baseMeta({
    title: 'My Skills',
    description: `Skills and technologies I use — ${config.name}`,
  });

export const MySkills = () => {
  const sectionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <section ref={sectionRef} className={styles.skills} data-visible={visible}>
        <h1 className={styles.title}>My Skills</h1>

        {/* Render each category */}
        {SKILL_CATEGORIES.map(category => (
          <div key={category.category} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.category}</h2>

            {/* Skills Grid for this category */}
            <div className={styles.skillsGrid}>
              {category.skills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className={styles.skillItem}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className={styles.skillIcon}>{skill.icon}</div>
                  <p className={styles.skillName}>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Floating description box - only shows when hovering */}
        {hoveredSkill && (
          <div className={styles.floatingDescription}>
            <h3>{hoveredSkill.name}</h3>
            <p>{hoveredSkill.description}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MySkills;
