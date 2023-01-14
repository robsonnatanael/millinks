import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import { Global, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { client } from '@src/lib/apolloClient';
import GlobalStyles from '@src/styles/globals';
import { theme } from '@src/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global styles={GlobalStyles} />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
export default MyApp;
