import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import * as theme from './components/styles/Variables';
import { GlobalStyle } from './components/styles/GlobalStyle';

import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';

import TutorialForm from './components/TutorialForm';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';

import Container from './components/styles/blocks/Container';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faUserCircle);

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: '',
        name: '',
        email: '',
        joined: ''
      }
    };
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined
      }
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar user={this.state.user} />
          <Container>
            <Route exact path='/' component={Content} />
            <Container small>
              <Route
                path='/submit'
                render={() => <TutorialForm user={this.state.user} />}
              />
              <Route path='/signup' component={SignUpForm} />
              <Route
                path='/login'
                render={() => <LogInForm loadUser={this.loadUser} />}
              />
            </Container>
          </Container>
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
