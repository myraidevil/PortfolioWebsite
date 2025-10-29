const VALID_BLUR_SUFFIX = ['jpg', 'jpeg', 'png', 'webp'];

export function generateBlurPlaceholder(src) {
  if (!src) return null;
  const extension = src.split('.').pop().toLowerCase();
  if (!VALID_BLUR_SUFFIX.includes(extension)) return null;

  return `${src.substring(0, src.lastIndexOf('.'))}-placeholder.${extension}`;
}

export function getSrcSet(src) {
  if (!src) return '';
  const extension = src.split('.').pop().toLowerCase();
  if (!VALID_BLUR_SUFFIX.includes(extension)) return src;

  const basePath = src.substring(0, src.lastIndexOf('.'));
  return `${basePath}-320w.${extension} 320w,
          ${basePath}-640w.${extension} 640w,
          ${basePath}-960w.${extension} 960w,
          ${src} 1280w`;
}

export function getSizes() {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
}
