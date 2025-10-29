export const lazyLoadImage = imageSrc => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const preloadImages = images => {
  return Promise.all(images.map(src => lazyLoadImage(src)));
};

export const getImageDimensions = src => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.src = src;
  });
};
