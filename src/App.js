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
      showTutorialForm: false,
      showSignUpForm: false,
      showLogInForm: false
    };
    this.renderTutorialForm = this.renderTutorialForm.bind(this);
    this.renderSignUpForm = this.renderSignUpForm.bind(this);
  }

  renderTutorialForm() {
    this.setState({
      showTutorialForm: true,
      showSignUpForm: false,
      showLogInForm: false
    });
  }

  renderSignUpForm() {
    this.setState({
      showTutorialForm: false,
      showSignUpForm: true,
      showLogInForm: false
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar
            renderTutorialForm={this.renderTutorialForm}
            renderSignUpForm={this.renderSignUpForm}
          />
          <Content
            showTutorialForm={this.state.showTutorialForm}
            showSignUpForm={this.state.showSignUpForm}
          />
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
