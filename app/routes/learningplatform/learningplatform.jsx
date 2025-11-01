import { useState, useEffect } from 'react';
import learn1 from '../../assets/learn1.png';
import learn2 from '../../assets/learn2.png';
import learn3 from '../../assets/learn3.png';
import learn4 from '../../assets/learn4.png';
import learn5 from '../../assets/learn5.png';
import learn6 from '../../assets/learn6.png';
import learn7 from '../../assets/learn7.png';
import learn8 from '../../assets/learn8.png';
import learn9 from '../../assets/learn9.png';
import learn10 from '../../assets/learn10.png';
import learn11 from '../../assets/learn11.png';
import learn12 from '../../assets/learn12.png';
import learn13 from '../../assets/learn122.png';
import learn14 from '../../assets/learn123.png';
import learn15 from '../../assets/learn13.png';
import learn16 from '../../assets/learn14.png';
import learn17 from '../../assets/learn15.png';
import learn18 from '../../assets/learn16.png';
import learn19 from '../../assets/learn17.png';

import { Link } from '@remix-run/react';
import { IoArrowBack, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Button } from '~/components/button';
import styles from './projects.module.css';
import { baseMeta } from '~/utils/meta';

export const meta = () =>
  baseMeta({
    title: 'Learning Management System | Project Showcase',
    description: 'Behance-style showcase for Learning Platform / QTrip project',
  });

export const LearningPlatform = () => {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🖼️ Easy-to-edit image list
  const galleryImages = [
    learn1,
    learn2,
    learn3,
    learn4,
    learn5,
    learn6,
    learn7,
    learn8,
    learn9,
    learn10,
    learn11,
    learn12,
    learn13,
    learn14,
    learn15,
    learn16,
    learn17,
    learn18,
    learn19,
  ];

  const handleImageClick = index => {
    setCurrentIndex(index);
    setFullscreenImage(galleryImages[index]);
  };

  const closeFullscreen = () => setFullscreenImage(null);

  const showPrevImage = e => {
    e.stopPropagation();
    const newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setFullscreenImage(galleryImages[newIndex]);
  };

  const showNextImage = e => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(newIndex);
    setFullscreenImage(galleryImages[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') closeFullscreen();
      if (e.key === 'ArrowLeft') showPrevImage(e);
      if (e.key === 'ArrowRight') showNextImage(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Fade-in animation
  useEffect(() => {
    const cards = document.querySelectorAll(`.${styles.imageCard}`);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  console.log(learn1);

  // Header scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      document.body.classList.toggle(styles.scrolled, window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.qtripstatic}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Link to="/" className={styles.backButton}>
            <IoArrowBack size={30} />
          </Link>
        </div>

        <h1 className={styles.title}>Learning Management System</h1>
        <Button
          as="a"
          href="https://your-live-demo-url.example"
          target="_blank"
          className={styles.demoButton}
        >
          Live Demo
        </Button>
      </div>

      {/* Image gallery */}
      <div className={styles.content}>
        <div className={styles.main}>
          <section id="gallery" className={styles.section}>
            <div className={styles.imageGrid}>
              {galleryImages.map((src, i) => (
                <div
                  key={`img-${i}`}
                  className={styles.imageCard}
                  onClick={() => handleImageClick(i)}
                >
                  <img
                    src={src}
                    alt={`Learn-${i}`}
                    loading="lazy"
                    className={styles.image}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Fullscreen viewer */}
      {fullscreenImage && (
        <div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={showPrevImage}
          >
            <IoChevronBack size={40} />
          </button>

          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className={styles.fullscreenImage}
          />

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={showNextImage}
          >
            <IoChevronForward size={40} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LearningPlatform;
