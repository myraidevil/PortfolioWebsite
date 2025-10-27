import { useRef, useEffect } from 'react';
import styles from './skills.module.css';
import { Button } from '~/components/button';
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiFigma,
  SiAdobephotoshop,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiExpress,
  SiGithub,
} from 'react-icons/si';

const SKILLS = [
  { name: 'React', icon: <SiReact /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Figma', icon: <SiFigma /> },
  { name: 'CSS3', icon: <SiCss3 /> },
  { name: 'Photoshop', icon: <SiAdobephotoshop /> },
  { name: 'JavaScript (ES6+)', icon: <SiJavascript /> },
  { name: 'Express.js', icon: <SiExpress /> },
  { name: 'HTML5', icon: <SiHtml5 /> },
  { name: 'Github', icon: <SiGithub /> },
];

export const Skills = ({ sectionRef, visible }) => {
  const carouselRef = useRef();

  useEffect(() => {
    const speed = 3; // faster speed in pixels per frame
    let animationFrameId;

    const scroll = () => {
      if (carouselRef.current) {
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        } else {
          carouselRef.current.scrollLeft += speed;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const skillsDuplicated = [...SKILLS, ...SKILLS]; // duplicate for seamless scroll

  return (
    <section ref={sectionRef} className={styles.skills} data-visible={visible}>
      <h2 className={styles.title}>My Skills</h2>

      <div className={styles.skillsCarousel} ref={carouselRef}>
        <div className={styles.scrollingWrapper}>
          {skillsDuplicated.map((skill, idx) => (
            <div
              key={`${skill.name}-${idx}`}
              className={styles.skillItem}
              style={{ transitionDelay: `${(idx % SKILLS.length) * 150}ms` }}
            >
              <div className={styles.skillIcon}>{skill.icon}</div>
              <p className={styles.skillName}>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>

      <Button
        href="/mySkills"
        iconHoverShift
        iconEnd="arrow-right"
        className={styles.viewAll}
      >
        View All Skills
      </Button>
    </section>
  );
};
