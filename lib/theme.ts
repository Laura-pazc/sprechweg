/**
 * Hex mirrors of the palette declared in global.css.
 *
 * Uniwind resolves the oklch theme tokens for `className`, but React Native
 * props (navigation tints, status bar, lucide icon colors) need values React
 * Native can parse directly. Keep these in sync with global.css.
 */
export const palette = {
  ink: '#10141A',
  cream: '#FDF4E4',
  canvas: '#F2F0E9',
  paper: '#FFFFFF',
  muted: '#5E6B78',
  royal: '#2B55E9',
  lime: '#C9EE5F',
  coral: '#F4512B',
  magenta: '#E44B7C',
  sunny: '#F9C242',
  sky: '#C8E5FA',
} as const;

export type PaletteColor = keyof typeof palette;
