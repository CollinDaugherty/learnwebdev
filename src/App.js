import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from './styles/Variables';
import { GlobalStyle } from './styles/GlobalStyle';

import Nav from './components/Nav';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Nav />
          <MainContent />
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
