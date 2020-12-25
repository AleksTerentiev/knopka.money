import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import '@openfonts/ibm-plex-mono_cyrillic';
import './i18n';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from './apollo';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { App } from './app';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
