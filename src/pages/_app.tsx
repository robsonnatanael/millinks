import type { AppProps } from 'next/app';

import { Global, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import GlobalStyles from '@src/styles/globals';
import { theme } from '@src/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
