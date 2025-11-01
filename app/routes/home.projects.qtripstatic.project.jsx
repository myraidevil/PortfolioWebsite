import { Button } from '~/components/button';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import styles from './home.projects.qtripstatic.project.module.css';
import { useRef, useState, useEffect } from 'react';
import qtripHero from '~/assets/gamestack-list-placeholder.jpg';
import qtripFeatures from '~/assets/gamestack-list-placeholder.jpg';
import qtripResponsive from '~/assets/gamestack-list-placeholder.jpg';

export const meta = () => {
  return [
    { title: 'QTrip Static - A Travel Website' },
    {
      name: 'description',
      content:
        'QTrip Static - A responsive travel website for booking adventure experiences.',
    },
  ];
};

export default function QTripStatic() {
  const [visibleSections, setVisibleSections] = useState([]);
  const projectIntro = useRef();
  const projectTech = useRef();
  const projectFeatures = useRef();
  const projectChallenges = useRef();
  const projectLearnings = useRef();

  useEffect(() => {
    const sections = [
      projectIntro,
      projectTech,
      projectFeatures,
      projectChallenges,
      projectLearnings,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    sections.forEach(section => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <article className={styles.project}>
      <Section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            alt="QTrip website hero section"
            role="presentation"
            src={qtripHero}
            className={styles.heroImage}
          />
        </div>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.details}>
              <Heading className={styles.title} level={2}>
                QTrip Static
              </Heading>
              <div className={styles.projectDescription}>
                <Text className={styles.projectSummary}>
                  A travel website enabling users to browse and book adventure experiences
                  across different cities. Built with a focus on responsive design and
                  clean code practices.
                </Text>
              </div>
            </div>
            <div className={styles.linkWrapper}>
              <Button
                secondary
                iconHoverShift
                className={styles.linkButton}
                icon="chevronRight"
                href="https://qtrip-static-rohit.netlify.app/"
                target="_blank"
              >
                View Website
              </Button>
              <Button
                secondary
                iconHoverShift
                className={styles.linkButton}
                icon="github"
                href="https://github.com/yourusername/qtrip-static"
                target="_blank"
              >
                View Source
              </Button>
            </div>
          </div>
        </header>
      </Section>

      <Section className={styles.section} ref={projectIntro}>
        <div
          className={styles.sectionContent}
          data-visible={visibleSections.includes(projectIntro.current)}
        >
          <Heading level={3}>Project Introduction</Heading>
          <Text>
            QTrip is a dynamic travel website that helps travelers explore, discover, and
            book adventure experiences across different cities. The project demonstrates
            strong HTML and CSS skills, with a particular focus on responsive design
            principles.
          </Text>
          <Text>
            This was a practice project to implement core HTML and CSS concepts, including
            Flexbox, Grid, media queries, and responsive images. The site maintains visual
            consistency across various screen sizes while providing an intuitive user
            experience.
          </Text>
        </div>
      </Section>

      <Section className={styles.section} ref={projectTech}>
        <div
          className={styles.sectionContent}
          data-visible={visibleSections.includes(projectTech.current)}
        >
          <Heading level={3}>Technologies Used</Heading>
          <div className={styles.techList}>
            <div className={styles.techItem}>
              <Text className={styles.techTitle}>HTML5</Text>
              <Text>Semantic markup, forms, and modern HTML features</Text>
            </div>
            <div className={styles.techItem}>
              <Text className={styles.techTitle}>CSS3</Text>
              <Text>Flexbox, Grid, animations, and responsive design</Text>
            </div>
            <div className={styles.techItem}>
              <Text className={styles.techTitle}>JavaScript</Text>
              <Text>DOM manipulation and dynamic content loading</Text>
            </div>
            <div className={styles.techItem}>
              <Text className={styles.techTitle}>Bootstrap</Text>
              <Text>Responsive components and utility classes</Text>
            </div>
          </div>
        </div>
      </Section>

      <Section className={styles.section} ref={projectFeatures}>
        <div
          className={styles.sectionContent}
          data-visible={visibleSections.includes(projectFeatures.current)}
        >
          <Heading level={3}>Key Features</Heading>
          <div className={styles.features}>
            <div className={styles.feature}>
              <Image src={qtripFeatures} alt="QTrip features showcase" />
              <div className={styles.featureText}>
                <Heading level={4}>Adventure Booking</Heading>
                <Text>
                  Browse and book adventure experiences across different cities. Each
                  adventure includes detailed information about duration, price, and
                  difficulty level.
                </Text>
              </div>
            </div>
            <div className={styles.feature}>
              <Image src={qtripResponsive} alt="QTrip responsive design" />
              <div className={styles.featureText}>
                <Heading level={4}>Responsive Design</Heading>
                <Text>
                  The website is fully responsive and works seamlessly across desktop,
                  tablet, and mobile devices. Implemented using modern CSS techniques
                  including Flexbox and Grid.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className={styles.section} ref={projectChallenges}>
        <div
          className={styles.sectionContent}
          data-visible={visibleSections.includes(projectChallenges.current)}
        >
          <Heading level={3}>Challenges & Solutions</Heading>
          <div className={styles.challenges}>
            <Text className={styles.challenge}>
              <strong>Challenge:</strong> Implementing a responsive grid layout for
              adventure cards that maintains visual consistency across different screen
              sizes.
            </Text>
            <Text className={styles.solution}>
              <strong>Solution:</strong> Utilized CSS Grid with auto-fit and minmax() to
              create a dynamic grid that automatically adjusts the number of columns based
              on available space while maintaining consistent card sizes.
            </Text>
            <Text className={styles.challenge}>
              <strong>Challenge:</strong> Creating an efficient image loading strategy for
              a content-heavy website.
            </Text>
            <Text className={styles.solution}>
              <strong>Solution:</strong> Implemented responsive images using srcset and
              sizes attributes, along with appropriate image compression to optimize
              loading times while maintaining quality.
            </Text>
          </div>
        </div>
      </Section>

      <Section className={styles.section} ref={projectLearnings}>
        <div
          className={styles.sectionContent}
          data-visible={visibleSections.includes(projectLearnings.current)}
        >
          <Heading level={3}>Key Learnings</Heading>
          <ul className={styles.learnings}>
            <Text as="li">
              Gained strong understanding of responsive design principles and their
              practical implementation
            </Text>
            <Text as="li">
              Improved CSS skills with advanced layout techniques using Flexbox and Grid
            </Text>
            <Text as="li">
              Learned best practices for organizing CSS code and maintaining scalable
              stylesheets
            </Text>
            <Text as="li">
              Developed better understanding of web accessibility and semantic HTML
            </Text>
          </ul>
        </div>
      </Section>
    </article>
  );
}
