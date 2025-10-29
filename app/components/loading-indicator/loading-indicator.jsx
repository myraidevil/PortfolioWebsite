import { motion } from 'framer-motion';
import styles from './loading-indicator.module.css';

export function LoadingIndicator({ className, size = 24 }) {
  return (
    <div
      className={`${styles.wrapper} ${className || ''}`}
      style={{ '--size': `${size}px` }}
    >
      <motion.div
        className={styles.indicator}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
