import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useTheme } from '~/components/theme-provider';
import { useWindowSize } from '~/hooks';
import { cssProps, media } from '~/utils/style';
import { FiEye } from 'react-icons/fi';
import katakana from './katakana.svg';
import clsx from 'clsx';
import styles from './project-summary.module.css';

export function ProjectSummary({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  imageSrc,
}) {
  const [focused, setFocused] = useState(false);
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const isMobile = width <= media.tablet;
  const svgOpacity = theme === 'light' ? 0.7 : 1;
  const titleId = `${id}-title`;
  const indexText = index < 10 ? `0${index}` : index;

  // Alternate layout only for desktop
  const alternate = index % 2 === 0 && !isMobile;

  // Compose katakana wrapper class with conditional mirroring
  const katakanaClass = clsx(styles.katakanaWrapper, {
    [styles.alternateKatakana]: alternate,
  });

  // Katakana SVG
  function renderKatakana(visible) {
    return (
      <svg
        className={styles.svg}
        data-visible={visible}
        data-light={theme === 'light'}
        style={cssProps({ opacity: svgOpacity })}
        viewBox="0 0 751 136"
      >
        <use href={`${katakana}#katakana-project`} />
      </svg>
    );
  }

  // Image and Katakana with Framer Motion animation
  function renderPreview(visible) {
    return (
      <motion.div
        className={styles.preview}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className={styles.imageWrapper}
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.9,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          viewport={{ once: true }}
        >
          <motion.img
            src={imageSrc}
            alt={`${title} preview`}
            className={styles.projectImage}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            viewport={{ once: true }}
          />

          <motion.div
            className={katakanaClass}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            whileInView={{ opacity: 0.85, scale: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
            viewport={{ once: true }}
          >
            {renderKatakana(visible)}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Project details with staggered reveal
  function renderDetails(visible) {
    return (
      <motion.div
        className={styles.details}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.1,
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div aria-hidden className={styles.index}>
          <Divider notchWidth="64px" notchHeight="8px" />
          <span className={styles.indexNumber}>{indexText}</span>
        </div>

        <Heading level={3} as="h2" className={styles.title} id={titleId}>
          {title}
        </Heading>

        <Text className={styles.description} as="p">
          {description}
        </Text>

        <div className={styles.projectCardButtons}>
          <Button iconHoverShift href={buttonLink} iconEnd="arrow-right">
            {buttonText}
          </Button>

          <Button href={secondaryButtonLink} data-variant="secondary">
            <FiEye style={{ marginRight: '8px', fontSize: '1.1em' }} />
            {secondaryButtonText}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {({ visible }) => (
            <>
              {alternate ? (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              ) : (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
