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
            <Route path='/submit' component={TutorialForm} />
            <Route path='/signup' component={SignUpForm} />
            <Route
              path='/login'
              render={() => <LogInForm loadUser={this.loadUser} />}
            />
          </Container>
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
