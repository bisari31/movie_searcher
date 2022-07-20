import 'styled-components';
import { Colors, Device, Sizes } from 'styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    sizes: Sizes;
    device: Device;
  }
}
