import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from './components/styles/Variables';
import { GlobalStyle } from './components/styles/GlobalStyle';

import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';

import TutorialForm from './components/TutorialForm';
import SignUpLogIn from './components/SignUpLogIn';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: null,
      showSignUp: true
    };
    this.renderForm = this.renderForm.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  renderForm(form) {
    this.setState({
      route: form
    });
  }

  changeForm() {
    this.setState({
      showSignUp: !this.state.showSignUp
    });
  }

  closeForm(e) {
    if (e.keyCode === 27) {
      this.setState({
        route: null,
        showSignUp: true
      });
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.closeForm);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeForm);
  }

  render() {
    let form;
    if (this.state.showSignUp) {
      form = <SignUpForm changeForm={this.changeForm} />;
    } else {
      form = <LogInForm changeForm={this.changeForm} />;
    }

    let popup;
    if (this.state.route === 'TutorialForm') {
      popup = <TutorialForm />;
    } else if (this.state.route === 'SignUp') {
      popup = <SignUpLogIn>{form}</SignUpLogIn>;
    } else {
      popup = null;
    }

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar renderForm={this.renderForm} />
          {popup}
          <Content />
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
