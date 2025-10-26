import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="72"
      height="44"
      viewBox="0 0 74 101"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M0.836014 15.4443L13.5987 8.17546C16.7685 43.6344 21.7156 98.9738 21.7156 98.9738L7.9298 55.2935L0.836014 15.4443Z" />
          <path d="M21.5991 4L28.5991 0L35.0991 4C32.3655 42.2676 29.5991 98 28.5991 97.9902C27.5991 97.9805 21.5991 4 21.5991 4Z" />
          <path d="M31.5991 55.3086L44.5991 49.5C55.055 65.3561 68.8297 86.6016 68.8297 86.6016L48.096 72.9032L31.5991 55.3086Z" />
          <path d="M30.3452 56.7556C38.0718 57.555 45.9715 56.3773 52.4114 53.4658C58.8513 50.5543 63.3392 46.1316 64.9474 41.1119C66.5556 36.0922 65.1612 30.8592 61.0524 26.4945C56.9436 22.1298 48.6631 18.307 41.0991 17L39.8278 25.232C44.4303 26.0273 48.391 27.9517 50.8911 30.6076C53.3913 33.2634 54.2397 36.4476 53.2612 39.502C52.2826 42.5564 49.5518 45.2475 45.6333 47.0191C41.7147 48.7907 36.9079 49.5074 32.2064 49.0209L30.3452 56.7556Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
