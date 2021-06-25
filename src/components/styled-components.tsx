import * as styledComponents from 'styled-components/native';
import { DefaultTheme } from 'styled-components';

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<DefaultTheme>;

export { css, ThemeProvider };
export default styled;
