import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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
      showSignUp: true
    };
    this.changeForm = this.changeForm.bind(this);
  }

  changeForm() {
    this.setState({
      showSignUp: !this.state.showSignUp
    });
  }

  render() {
    let form;
    if (this.state.showSignUp) {
      form = <SignUpForm changeForm={this.changeForm} />;
    } else {
      form = <LogInForm changeForm={this.changeForm} />;
    }

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar />
          <Route exact path='/' component={Content} />
          <Route path='/submit' component={TutorialForm} />
          <Route
            path='/signup'
            render={() => <SignUpLogIn>{form}</SignUpLogIn>}
          />
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
