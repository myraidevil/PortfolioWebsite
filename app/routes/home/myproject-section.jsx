import { useState } from 'react';
import { ProjectSummary } from './project-summary';
import styles from './myproject-section.module.css';
import { Divider } from '~/components/divider';

export default function MyProjectsSection({ projects }) {
  const [activeTab, setActiveTab] = useState('Development');

  const filteredProjects = projects.filter(
    project => project.category === activeTab
  );

  return (
    <section className={styles.myProjectsSection}>
      <h2>My Projects</h2>
      <p>Curated project list for you to view</p>

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
              {tab}
            </button>
          );
        })}
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, idx) => (
          <ProjectSummary
            key={project.id}
            {...project}
            index={idx + 1}
            visible={true}
          />
        ))}
        {filteredProjects.length === 0 && <p>No projects found.</p>}
      </div>
    </section>
  );
}
