import { DefaultTheme } from 'styled-components';

const colors = {
  black: '#2e2e2e',
  gray: '#f3f3f5',
  gray2: '#a6a5ab',
};

const sizes = {
  tablet: '768px',
  laptop: '1024px',
};

const device = {
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
};

const theme: DefaultTheme = {
  colors,
  sizes,
  device,
};

export type Colors = typeof colors;
export type Sizes = typeof sizes;
export type Device = typeof device;

export default theme;
