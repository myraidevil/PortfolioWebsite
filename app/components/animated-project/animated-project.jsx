import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { OptimizedImage } from '~/components/optimized-image/optimized-image';
import styles from './animated-project.module.css';

export function AnimatedProject({
  title,
  imageSrc,
  renderKatakana,
  katakanaClass,
  visible,
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const content = (
    <div className={styles.imageWrapper}>
      <OptimizedImage
        src={imageSrc}
        alt={`${title} preview`}
        className={styles.projectImage}
      />
      <div className={katakanaClass}>{renderKatakana(visible)}</div>
    </div>
  );

  if (!isClient) {
    return <div className={styles.preview}>{content}</div>;
  }

  return (
    <motion.div
      className={styles.preview}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.3,
        }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}
