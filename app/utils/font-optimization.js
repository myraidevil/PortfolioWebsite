export function optimizeFontDisplay(fontUrl, options = {}) {
  const {
    display = 'swap',
    weight = '400',
    style = 'normal',
    unicodeRange = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  } = options;

  return `
    @font-face {
      font-family: '${options.fontFamily || 'Gotham'}';
      font-style: ${style};
      font-weight: ${weight};
      font-display: ${display};
      src: url('${fontUrl}') format('woff2');
      unicode-range: ${unicodeRange};
    }
  `;
}

export function generateFontPreloadTags(fonts) {
  return fonts.map(font => ({
    rel: 'preload',
    href: font.url,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  }));
}
