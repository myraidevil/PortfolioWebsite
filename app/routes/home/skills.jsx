import { useRef, useEffect, useState } from 'react';
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
  const [glowIndex, setGlowIndex] = useState(0);

  const skillsDuplicated = [...SKILLS, ...SKILLS]; // duplicate for smooth scroll

  useEffect(() => {
    // ✅ Adjust scroll speed dynamically based on screen size
    const getSpeed = () => (window.innerWidth <= 768 ? 1.5 : 3); // slower on mobile
    let speed = getSpeed();

    const handleResize = () => {
      speed = getSpeed(); // update on resize
    };
    window.addEventListener('resize', handleResize);

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

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.skills} data-visible={visible}>
      <h2 className={styles.title}>My Skills</h2>

      <div className={styles.skillsCarousel} ref={carouselRef}>
        <div className={styles.scrollingWrapper}>
          {skillsDuplicated.map((skill, idx) => {
            const baseIndex = idx % SKILLS.length;
            const isGlowing = baseIndex === glowIndex;

            return (
              <div
                key={`${skill.name}-${idx}`}
                className={`${styles.skillItem} ${isGlowing ? styles.glowing : ''}`}
              >
                <div className={styles.skillIcon}>{skill.icon}</div>
                <p className={styles.skillName}>{skill.name}</p>
              </div>
            );
          })}
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
