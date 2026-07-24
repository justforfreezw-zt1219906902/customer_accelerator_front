export const fontFamilies = {
  inter: 'var(--font-family-inter)',
  mono: 'var(--font-family-mono)',
} as const;

export const fontWeights = {
  light: 'var(--font-weight-light)',
  regular: 'var(--font-weight-regular)',
  medium: 'var(--font-weight-medium)',
  semibold: 'var(--font-weight-semibold)',
} as const;

export const typography = {
  displayHero: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-display-hero-font-size)',
    lineHeight: 'var(--typography-display-hero-line-height)',
    letterSpacing: 'var(--typography-display-hero-letter-spacing)',
  },
  headingH1: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-heading-h1-font-size)',
    lineHeight: 'var(--typography-heading-h1-line-height)',
    letterSpacing: 'var(--typography-heading-h1-letter-spacing)',
  },
  headingH2: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-heading-h2-font-size)',
    lineHeight: 'var(--typography-heading-h2-line-height)',
    letterSpacing: 'var(--typography-heading-h2-letter-spacing)',
  },
  headingH3: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-heading-h3-font-size)',
    lineHeight: 'var(--typography-heading-h3-line-height)',
    letterSpacing: 'var(--typography-heading-h3-letter-spacing)',
  },
  headingH4: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-heading-h4-font-size)',
    lineHeight: 'var(--typography-heading-h4-line-height)',
    letterSpacing: 'var(--typography-heading-h4-letter-spacing)',
  },
  bodyLg: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-body-lg-font-size)',
    lineHeight: 'var(--typography-body-lg-line-height)',
    letterSpacing: 'var(--typography-body-lg-letter-spacing)',
  },
  bodyBase: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-body-base-font-size)',
    lineHeight: 'var(--typography-body-base-line-height)',
    letterSpacing: 'var(--typography-body-base-letter-spacing)',
  },
  bodySm: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-body-sm-font-size)',
    lineHeight: 'var(--typography-body-sm-line-height)',
    letterSpacing: 'var(--typography-body-sm-letter-spacing)',
  },
  labelUi: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-label-ui-font-size)',
    lineHeight: 'var(--typography-label-ui-line-height)',
    letterSpacing: 'var(--typography-label-ui-letter-spacing)',
  },
  labelButton: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-label-button-font-size)',
    lineHeight: 'var(--typography-label-button-line-height)',
    letterSpacing: 'var(--typography-label-button-letter-spacing)',
  },
  labelMonoKicker: {
    fontFamily: fontFamilies.mono,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-label-mono-kicker-font-size)',
    lineHeight: 'var(--typography-label-mono-kicker-line-height)',
    letterSpacing: 'var(--typography-label-mono-kicker-letter-spacing)',
  },
  wordmark: {
    fontFamily: fontFamilies.inter,
    fontWeight: fontWeights.regular,
    fontSize: 'var(--typography-wordmark-font-size)',
    lineHeight: 'var(--typography-wordmark-line-height)',
    letterSpacing: 'var(--typography-wordmark-letter-spacing)',
  },
} as const;
