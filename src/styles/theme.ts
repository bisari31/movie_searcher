import { DefaultTheme } from 'styled-components';

const colors = {
  RED: '#ff3b30',
  ORANGE: '#ff9500',
  YELLOW: '#fc0',
  GREEN: '#34c759',
  TEAL: '#5ac8fa',
  BLUE: '#007aff',
  INDIGO: '#5856d6',
  PURPLE: '#af52de',
  PINK: '#ff2d55',
};

const theme: DefaultTheme = {
  colors,
};

export type Colors = typeof colors;

export default theme;
