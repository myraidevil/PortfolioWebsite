import { useState, useEffect } from 'react';
import task1 from '../../assets/task1.png';
import task2 from '../../assets/task2.png';
import task3 from '../../assets/task3.png';
import task4 from '../../assets/task4.png';
import task5 from '../../assets/task5.png';
import task6 from '../../assets/task6.png';
import task7 from '../../assets/task7.png';
import task8 from '../../assets/task8.png';
import task9 from '../../assets/task9.png';
import task10 from '../../assets/task10.png';
import task11 from '../../assets/task11.png';
import { Link } from '@remix-run/react';
import { IoArrowBack, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Button } from '~/components/button';
import styles from './projects.module.css';
import { baseMeta } from '~/utils/meta';

export const meta = () =>
  baseMeta({
    title: 'Task Manager | Project Showcase',
    description: 'Behance-style showcase for Task Manager / QTrip project',
  });

export const TaskManager = () => {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🖼️ Easy-to-edit image list
  const galleryImages = [
    task1,
    task2,
    task3,
    task4,
    task5,
    task6,
    task7,
    task8,
    task9,
    task10,
    task11,
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

  console.log(task1);

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

        <h1 className={styles.title}>Task Manager</h1>
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
                    alt={`task-${i}`}
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

export default TaskManager;
