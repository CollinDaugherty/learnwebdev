import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import variables from './styles/variables';

import Nav from './components/Nav';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={variables}>
        <div>
          <Nav />
          <MainContent />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
