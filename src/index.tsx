import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './i18n'
import '@openfonts/ibm-plex-mono_cyrillic'
import { ApolloProvider } from '@apollo/react-hooks'
import { apolloClient } from './apollo.client'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { App } from './app'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
