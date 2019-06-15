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
      route: ''
    };
    this.renderForm = this.renderForm.bind(this);
  }

  renderForm(form) {
    this.setState({
      route: form
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar renderForm={this.renderForm} />
          <Content route={this.state.route} />
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
