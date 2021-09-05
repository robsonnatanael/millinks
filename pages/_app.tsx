import '@src/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import theme from '@src/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp
