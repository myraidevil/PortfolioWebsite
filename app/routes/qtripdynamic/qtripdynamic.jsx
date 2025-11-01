import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from '~/components/button';
import styles from './projects.module.css';
import { baseMeta } from '~/utils/meta';

export const meta = () =>
  baseMeta({
    title: 'QTripDynamic | Project Case Study',
    description:
      'A dynamic travel website built using REST APIs to fetch and render city and adventure data interactively, with filters, details pages, and deployment on Netlify.',
  });

export const QTripDynamic = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'landing', label: 'Fetch data using REST API' },
    { id: 'adventures', label: 'Implement Adventures page' },
    { id: 'details', label: 'Create Adventure details page' },
    { id: 'deploy', label: 'Deploy the QTripDynamic website' },
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

  const handleImageClick = src => setFullscreenImage(src);
  const closeFullscreen = () => setFullscreenImage(null);

  return (
    <div className={styles.qtripdynamic}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Link to="/" className={styles.backButton}>
            <IoArrowBack size={30} />
          </Link>
        </div>
        <h1 className={styles.title}>QTripDynamic</h1>
        <Button
          as="a"
          href="https://qtripdynamic.netlify.app"
          target="_blank"
          className={styles.demoButton}
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
        <div className={styles.main}>
          {/* Overview */}
          <section id="overview" className={styles.section}>
            <h2>Overview</h2>
            <p>
              QTripDynamic is an enhanced version of QTrip that focuses on interactivity
              and scalability. It fetches city and adventure data dynamically using REST
              APIs, allowing real-time updates without modifying static files. Users can
              explore cities, filter adventures, and make simulated reservations — all
              within a responsive interface.
            </p>

            <ul>
              <li>
                Integrated REST APIs to dynamically fetch and render city/adventure data
              </li>
              <li>
                Implemented filtering, detail pages, and localStorage-based reservations
              </li>
              <li>Deployed live using Netlify for seamless hosting</li>
            </ul>

            <div className={styles.imageGrid}>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/5ea9a041-3677-44dd-be8c-2f41b84977e9?"
                  alt="Dynamic landing page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/5ea9a041-3677-44dd-be8c-2f41b84977e9?'
                    )
                  }
                />
                <p className={styles.imageLabel}>
                  Dynamic landing page fetching cities via API
                </p>
              </div>
            </div>
          </section>

          {/* Landing Section */}
          <section id="landing" className={styles.section}>
            <h2>Fetch data dynamically for landing page</h2>
            <h3>Scope of work</h3>
            <ul>
              <li>Fetched city data dynamically using REST API</li>
              <li>Dynamically rendered city cards with live data</li>
              <li>Handled loading states and error conditions gracefully</li>
            </ul>

            <h3>Skills used</h3>
            <div className={styles.skillTags}>
              {['HTML', 'CSS', 'JavaScript', 'REST API', 'Fetch API'].map(skill => (
                <span key={skill} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>

            <div className={styles.imageGrid}>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/2ea56c1c-96f7-4a02-ae6f-6889bad99423?"
                  alt="API-based city rendering"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/2ea56c1c-96f7-4a02-ae6f-6889bad99423?'
                    )
                  }
                />
                <p className={styles.imageLabel}>
                  Cities dynamically rendered from API response
                </p>
              </div>
            </div>
          </section>

          {/* Adventures Section */}
          <section id="adventures" className={styles.section}>
            <h2>Implement adventures with filters</h2>
            <h3>Scope of work</h3>
            <ul>
              <li>Developed multi-select filters for category and duration</li>
              <li>Used URL parameters to retain filter state between navigations</li>
              <li>Rendered filtered adventures dynamically without reloading</li>
            </ul>

            <h3>Skills used</h3>
            <div className={styles.skillTags}>
              {['JavaScript', 'Filtering Logic', 'DOM Manipulation', 'Responsive UI'].map(
                skill => (
                  <span key={skill} className={styles.tag}>
                    {skill}
                  </span>
                )
              )}
            </div>

            <div className={styles.imageGrid}>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/2ea56c1c-96f7-4a02-ae6f-6889bad99423?"
                  alt="Adventures with filters"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/2ea56c1c-96f7-4a02-ae6f-6889bad99423?'
                    )
                  }
                />
                <p className={styles.imageLabel}>Filter-based dynamic adventures page</p>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section id="details" className={styles.section}>
            <h2>Create adventure details and reservations</h2>
            <h3>Scope of work</h3>
            <ul>
              <li>Fetched and displayed detailed data for each adventure</li>
              <li>Implemented booking form storing reservations in localStorage</li>
              <li>Displayed dynamic banners for success and reservation status</li>
            </ul>

            <h3>Skills used</h3>
            <div className={styles.skillTags}>
              {['HTML', 'CSS', 'JavaScript', 'LocalStorage', 'Dynamic Rendering'].map(
                skill => (
                  <span key={skill} className={styles.tag}>
                    {skill}
                  </span>
                )
              )}
            </div>

            <div className={styles.imageGrid}>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/dd79cabf-8e7d-49a1-bf5c-9013ceafa19a?"
                  alt="Adventure details page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/dd79cabf-8e7d-49a1-bf5c-9013ceafa19a?'
                    )
                  }
                />
                <p className={styles.imageLabel}>
                  Adventure details and reservation form
                </p>
              </div>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/dbe1d87d-b815-47dd-929a-1f63a57b58a0?"
                  alt="Adventure details page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/dbe1d87d-b815-47dd-929a-1f63a57b58a0?'
                    )
                  }
                />
                <p className={styles.imageLabel}>
                  Adventure details and reservation form
                </p>
              </div>
              <div className={styles.imageCard}>
                <img
                  src="https://directus.crio.do/assets/26d7adc8-3889-411f-9409-0eeef8b4360d?"
                  alt="Adventure details page"
                  onClick={() =>
                    handleImageClick(
                      'https://directus.crio.do/assets/26d7adc8-3889-411f-9409-0eeef8b4360d?'
                    )
                  }
                />
                <p className={styles.imageLabel}>
                  Adventure details and reservation form
                </p>
              </div>
            </div>
          </section>

          {/* Deployment Section */}
          <section id="deploy" className={styles.section}>
            <h2>Deploy the QTripDynamic website</h2>
            <h3>Scope of work</h3>
            <ul>
              <li>Deployed QTripDynamic using Netlify with Git-based CI/CD</li>
              <li>Tested API calls and routes in production environment</li>
            </ul>

            <h3>Skills used</h3>
            <div className={styles.skillTags}>
              {['Deployment', 'Netlify', 'Version Control', 'CI/CD'].map(skill => (
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

export default QTripDynamic;
