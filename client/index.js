import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from './services/material-ui/theme'
import AppContainer from './components/App/AppContainer'

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <AppContainer />
  </MuiThemeProvider>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
