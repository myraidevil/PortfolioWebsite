import { useState } from 'react';
import { motion } from 'framer-motion';
import { useHasMounted } from '~/hooks';
import { LoadingIndicator } from '../loading-indicator/loading-indicator';
import styles from './optimized-image.module.css';

export function OptimizedImage({ src, alt, className, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const hasMounted = useHasMounted();

  // Handle image loading
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleError = () => {
    setError(true);
  };

  // Generate placeholder version of image URL
  const getPlaceholderSrc = url => {
    if (!url) return '';
    try {
      // Handle both relative and absolute URLs
      const urlObj = new URL(url, window.location.origin);
      const parts = urlObj.pathname.split('.');
      const ext = parts.pop();
      return `${parts.join('.')}-placeholder.${ext}`;
    } catch (e) {
      // Fallback for relative paths
      const parts = url.split('.');
      const ext = parts.pop();
      return `${parts.join('.')}-placeholder.${ext}`;
    }
  };

  const imageComponent = (
    <>
      <img
        key="static"
        src={src}
        alt={alt}
        className={`${styles.image} ${className || ''}`}
        loading="lazy"
        decoding="async"
        style={{
          display: hasMounted ? 'none' : 'block',
        }}
        {...props}
      />
      {hasMounted && (
        <motion.img
          key="animated"
          src={src}
          alt={alt}
          className={`${styles.image} ${className || ''} ${
            isLoaded ? styles.loaded : ''
          }`}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.98 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          {...props}
        />
      )}
    </>
  );

  return (
    <div className={styles.wrapper}>
      {!error && (
        <>
          <div
            className={styles.placeholder}
            style={{
              backgroundImage: `url(${getPlaceholderSrc(src)})`,
              opacity: isLoaded ? 0 : 1,
            }}
          />
          {!isLoaded && (
            <div className={styles.loaderWrapper}>
              <LoadingIndicator />
            </div>
          )}
          {imageComponent}
        </>
      )}
      {error && <div className={styles.error}>Failed to load image</div>}
    </div>
  );
}
