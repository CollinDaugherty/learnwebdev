import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import * as theme from './components/styles/Variables';
import { GlobalStyle } from './components/styles/GlobalStyle';

import { SearchProvider } from './SearchContext';

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

    this.updateList = list => {
      this.setState({
        list: list
      });
    };

    this.updateSearchTerms = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    this.searchTutorials = e => {
      if (this.state.searchTerms.length) {
        fetch(`/api/tutorials/search/${this.state.searchTerms}`)
          .then(res => res.json())
          .then(list => this.setState({ list }));
      } else {
        fetch('/api/tutorials')
          .then(res => res.json())
          .then(list => this.setState({ list }));
      }
      e.preventDefault();
    };

    this.state = {
      list: [],
      searchTerms: '',
      updateSearchTerms: this.updateSearchTerms,
      searchTutorials: this.searchTutorials,

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
        <SearchProvider value={this.state}>
          <div>
            <Navbar user={this.state.user} />
            <Container>
              <Route
                exact
                path='/'
                render={() => <Content updateList={this.updateList} />}
              />
              <Container small>
                <Route
                  path='/tutorials/submit'
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
        </SearchProvider>
      </ThemeProvider>
    );
  }
}

export default App;
