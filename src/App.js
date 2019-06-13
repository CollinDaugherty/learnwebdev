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
      showSubmitForm: false
    };
    this.renderSubmitForm = this.renderSubmitForm.bind(this);
  }

  renderSubmitForm() {
    this.setState({
      showSubmitForm: !this.state.showSubmitForm
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar renderSubmitForm={this.renderSubmitForm} />
          <Content showSubmitForm={this.state.showSubmitForm} />
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
