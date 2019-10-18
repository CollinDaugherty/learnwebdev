import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import history from './history';
import PrivateRoute from './PrivateRoute';

import { ThemeProvider } from 'styled-components';
import * as theme from './components/styles/Variables';
import { GlobalStyle } from './components/styles/GlobalStyle';

import { UserProvider } from './UserContext';
import { SearchProvider } from './SearchContext';

import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import TutorialList from './components/TutorialList';
import TutorialPage from './components/TutorialPage';
import InstructorPage from './components/InstructorPage';
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

    this.logout = () => {
      fetch('/api/logout')
        .then(res => res.json)
        .then(
          this.setState(prevState => ({
            user: {
              logout: this.logout
            },
            notifications: [
              {
                type: 'success',
                message: 'Successfully logged out'
              },
              ...prevState.notifications
            ]
          }))
        )
        .then(history.push('/'));
    };

    this.updateList = list => {
      this.setState(prevState => ({
        search: {
          ...prevState.search,
          list: list
        }
      }));
    };

    this.updateSearchTerms = event => {
      const { value } = event.target;
      this.setState(prevState => ({
        search: {
          ...prevState.search,
          searchTerms: value
        }
      }));
    };

    this.searchTutorials = e => {
      if (this.state.search.searchTerms.length) {
        fetch(`/api/tutorials/search/${this.state.search.searchTerms}`)
          .then(res => res.json())
          .then(list =>
            this.setState(prevState => ({
              search: {
                ...prevState.search,
                list: list
              }
            }))
          );
      } else {
        fetch('/api/tutorials')
          .then(res => res.json())
          .then(list =>
            this.setState(prevState => ({
              search: {
                ...prevState.search,
                list: list
              }
            }))
          );
      }
      e.preventDefault();
    };

    this.state = {
      user: {
        logout: this.logout
      },
      search: {
        list: [],
        searchTerms: '',
        updateSearchTerms: this.updateSearchTerms,
        searchTutorials: this.searchTutorials
      },

      notifications: []
    };
  }

  loadUser = () => {
    fetch('/api/user_session')
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.setState(prevState => ({
            user: {
              ...prevState.user,
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              isAuthenticated: user.isAuthenticated
            }
          }));
        }
      });
  };

  componentDidMount() {
    this.loadUser();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <UserProvider value={this.state.user}>
          <SearchProvider value={this.state.search}>
            <div>
              <Navbar />
              <Notifications notifications={this.state.notifications} />

              <Container>
                <Route
                  exact
                  path='/'
                  render={() => <TutorialList updateList={this.updateList} />}
                />
                <Route
                  path='/tutorials/page/:pageId'
                  component={TutorialPage}
                />
                <Route path='/instructors/:id' component={InstructorPage} />
                <Container small>
                  <Switch>
                    <PrivateRoute
                      path='/tutorials/submit'
                      component={TutorialForm}
                    />
                    <Route exact path='/signup' render={() => <SignUpForm />} />
                    <Route
                      exact
                      path='/login'
                      render={() => <LogInForm loadUser={this.loadUser} />}
                    />
                  </Switch>
                </Container>
              </Container>

              <Footer />
              <GlobalStyle />
            </div>
          </SearchProvider>
        </UserProvider>
      </ThemeProvider>
    );
  }
}

export default App;
