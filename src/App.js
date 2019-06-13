import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from './components/styles/Variables';
import { GlobalStyle } from './components/styles/GlobalStyle';

import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showTutorialForm: false
    };
    this.renderTutorialForm = this.renderTutorialForm.bind(this);
  }

  renderTutorialForm() {
    this.setState({
      showTutorialForm: !this.state.showTutorialForm
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar renderTutorialForm={this.renderTutorialForm} />
          <Content showTutorialForm={this.state.showTutorialForm} />
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
