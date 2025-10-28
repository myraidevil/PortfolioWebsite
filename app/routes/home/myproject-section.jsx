import { useState } from 'react';
import { ProjectSummary } from './project-summary'; // Adjust path if needed
import styles from './myproject-section.module.css'; // You can create styles or add inline styles here
import { Divider } from '~/components/divider';

export default function MyProjectsSection({ projects }) {
  const [activeTab, setActiveTab] = useState('Development');

  // Filter projects by active tab
  const filteredProjects = projects.filter(project => project.category === activeTab);

  return (
    <section className={styles.myProjectsSection}>
      <h2>My Projects</h2>
      <p>curated project list for you to view </p>

      <div className={styles.tabs}>
        {['Design', 'Development'].map(tab => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              className={`${styles.tabButton} ${isActive ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab === 'Development' ? ' Development' : ' Design'}
            </button>
          );
        })}
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, idx) => (
          <ProjectSummary
            key={project.id}
            id={project.id}
            index={idx + 1}
            title={project.title}
            description={project.description}
            buttonText={project.buttonText}
            buttonLink={project.buttonLink}
            secondaryButtonText={project.secondaryButtonText}
            secondaryButtonLink={project.secondaryButtonLink}
            imageSrc={project.imageSrc}
            visible={true}
          />
        ))}
        {filteredProjects.length === 0 && <p>No projects found.</p>}
      </div>
    </section>
  );
}
