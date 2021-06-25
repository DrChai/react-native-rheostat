import React from 'react';
import { ThemeProviderProps } from 'styled-components';
import { ThemeProvider } from './components/styled-components';

export const defaultTheme = {
  themeColor: 'palevioletred',
  grey: '#d8d8d8',
};

const RheostatThemeProvider = (props:ThemeProviderProps<object>) => {
  const {
    theme,
    children,
  } = props;
  const rheostatTheme = {
    rheostat: { ...defaultTheme, ...theme },
    // Namespace the theme for the user
  };
  return (
    <ThemeProvider theme={rheostatTheme}>
      {children}
    </ThemeProvider>
  );
};

export default RheostatThemeProvider;
