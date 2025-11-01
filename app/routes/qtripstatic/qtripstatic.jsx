import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from '~/components/button';
import styles from './projects.module.css';
import { baseMeta } from '~/utils/meta';

export const meta = () =>
  baseMeta({
    title: 'QTripStatic | Project Case Study',
    description:
      'A responsive travel website showcasing adventure experiences across multiple cities using HTML, CSS, and Bootstrap.',
  });

export const QTripStatic = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [fullscreenImage, setFullscreenImage] = useState(null); // ✅ added

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'layout', label: 'Create layout for the landing page' },
    { id: 'adventures', label: 'Implement the adventures page' },
    { id: 'details', label: 'Add the adventure details page' },
    { id: 'deploy', label: 'Deploy the QTripStatic website' },
  ];

  const handleScroll = id => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ✅ handle image click
  const handleImageClick = src => {
    setFullscreenImage(src);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className={styles.qtripstatic}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Link to="/" className={styles.backButton}>
            <IoArrowBack size={30} />
          </Link>
        </div>
        <h1 className={styles.title}>QTripStatic</h1>
        <Button
          as="a"
          href="https://qtrip.netlify.app"
          target="_blank"
          className={styles.liveDemo}
        >
          Live Demo
        </Button>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Sidebar */}
        <nav className={styles.sidebar}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className={`${styles.sidebarButton} ${
                activeSection === section.id ? styles.sidebarButtonActive : ''
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Scrollable Main Section */}
        <div className={styles.mainContent}>
          {/* Overview */}
          <section id="overview" className={styles.section}>
            <h2>Overview</h2>
            <p>
              QTrip is a travel website aimed at travellers looking for a multitude of
              adventures in different cities. During the course of this project:
            </p>
            <ul>
              <li>
                Created 3 different web pages from wireframe layouts using HTML and CSS
              </li>
              <li>Utilized Bootstrap extensively for responsive design</li>
              <li>Deployed the website to Netlify/Vercel</li>
            </ul>

            <div className={styles.imageGrid}>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/4b996c66-44a8-49d6-bba3-684225f7cd21?"
                  alt="QTrip Landing page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/4b996c66-44a8-49d6-bba3-684225f7cd21?'
                    )
                  }
                />
                <p className={styles.imageLabel}>QTrip Landing page</p>
              </div>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/7b0df37a-c640-4bc7-9a0c-23d293683054?"
                  alt="QTrip Adventures page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/7b0df37a-c640-4bc7-9a0c-23d293683054?'
                    )
                  }
                />
                <p className={styles.imageLabel}>QTrip Adventures page</p>
              </div>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/05be60d5-d3a1-4e34-bf63-47a26262c5bc?"
                  alt="QTrip Adventures page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/05be60d5-d3a1-4e34-bf63-47a26262c5bc?'
                    )
                  }
                />
                <p className={styles.imageLabel}>QTrip Adventures page</p>
              </div>
            </div>
          </section>

          {/* Layout Section */}
          <section id="layout" className={styles.section}>
            <h2>Create layout for the landing page</h2>
            <h3>Scope of work</h3>
            <ul>
              <li>
                Added a navigation bar that collapses automatically on smaller devices
              </li>
              <li>Implemented hero image section aligned as per the wireframe design</li>
              <li>Created responsive grid of cities using Bootstrap’s grid system</li>
              <li>Added hover effects for city tiles</li>
            </ul>

            <h3>Skills used</h3>
            <div className={styles.skillTags}>
              {['HTML', 'CSS', 'Flexbox', 'Responsive Design', 'Bootstrap'].map(skill => (
                <span key={skill} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>

            <div className={styles.imageGrid}>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/b1547410-a096-4252-80a3-bcebe1bcb37c?"
                  alt="Wireframe layout"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/b1547410-a096-4252-80a3-bcebe1bcb37c?'
                    )
                  }
                />
                <p className={styles.imageLabel}>Wireframe for QTrip landing page</p>
              </div>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/4b996c66-44a8-49d6-bba3-684225f7cd21?"
                  alt="QTrip Landing Page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/4b996c66-44a8-49d6-bba3-684225f7cd21?'
                    )
                  }
                />
                <p className={styles.imageLabel}>QTrip Landing page</p>
              </div>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/4c6a82cc-cb1c-4f77-ac56-6cc21bfed0ca?"
                  alt="QTrip Landing Page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/4c6a82cc-cb1c-4f77-ac56-6cc21bfed0ca?'
                    )
                  }
                />
                <p className={styles.imageLabel}>QTrip Landing page</p>
              </div>
            </div>
          </section>

          {/* Adventures Section */}
          <section id="adventures" className={styles.section}>
            <h2>Implement the adventures page</h2>
            <h3>Scope of work</h3>
            <ul>
              <li>Created a responsive grid of adventures using Bootstrap</li>
              <li>Made text responsive using flex and spacing utilities</li>
              <li>Ensured proper spacing and responsive images</li>
            </ul>

            <h3>Skills used</h3>
            <div className={styles.skillTags}>
              {['HTML', 'CSS', 'Bootstrap', 'Responsive Images'].map(skill => (
                <span key={skill} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>

            <div className={styles.imageGrid}>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/665e2c16-9a19-4d84-b967-7c4210833e8d?"
                  alt="Adventures Page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/665e2c16-9a19-4d84-b967-7c4210833e8d?'
                    )
                  }
                />
                <p className={styles.imageLabel}>
                  Adventures page (various screen sizes)
                </p>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section id="details" className={styles.section}>
            <h2>Add the adventure details page</h2>
            <h3>Scope of work</h3>
            <ul>
              <li>Built the layout from scratch using HTML and CSS</li>
              <li>Positioned images with responsive toggling</li>
              <li>Added “Sold out” fixed sidebar section</li>
            </ul>

            <h3>Skills used</h3>
            <div className={styles.skillTags}>
              {[
                'HTML',
                'CSS',
                'Bootstrap Positioning',
                'Display utilities',
                'Bootstrap',
              ].map(skill => (
                <span key={skill} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>

            <div className={styles.imageGrid}>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/65df23d0-bd86-4541-bac7-4491189dae83?"
                  alt="Adventure Details Page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/65df23d0-bd86-4541-bac7-4491189dae83?'
                    )
                  }
                />
                <p className={styles.imageLabel}>Adventure details page wireframe</p>
              </div>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/d2192e14-3901-4e25-bfcd-361f265b881d?"
                  alt="Adventure Details Page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/d2192e14-3901-4e25-bfcd-361f265b881d?'
                    )
                  }
                />
                <p className={styles.imageLabel}>
                  Adventure details page on different screen sizes
                </p>
              </div>
            </div>
          </section>

          {/* Deployment Section */}
          <section id="deploy" className={styles.section}>
            <h2>Deploy the QTripStatic website</h2>
            <h3>Scope of work</h3>
            <ul>
              <li>Deployed the QTripStatic website to Netlify using CLI</li>
            </ul>

            <h3>Skills used</h3>
            <div className={styles.skillTags}>
              {['Deployment', 'Netlify', 'Netlify CLI'].map(skill => (
                <span key={skill} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ✅ Fullscreen Overlay */}
      {fullscreenImage && (
        <div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className={styles.fullscreenImage}
          />
        </div>
      )}
    </div>
  );
};

export default QTripStatic;
