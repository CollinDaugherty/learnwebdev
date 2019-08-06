import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CurrentUser from './CurrentUser';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadow.low};

  h1 {
    flex: 1;
  }

  input[type='text'] {
    flex: 1;
    border: none;
    border-radius: ${props => props.theme.border.radius};
    background: ${props => props.theme.color.neutral._100};
    padding: 0.8rem;
    font-size: 1.5rem;

    &:focus {
      color: ${props => props.theme.color.primary._700};
    }
  }

  ul {
    flex: 1;
    text-align: right;
    list-style-type: none;

    li {
      display: inline-block;
      margin-left: 1rem;

      a,
      button {
        padding: 0.8rem;
        border-radius: ${props => props.theme.border.radius};

        &:hover {
          background: ${props => props.theme.color.neutral._100};
        }
      }
    }
  }
`;

class Navbar extends Component {
  render() {
    const { user } = this.props;
    return (
      <Nav>
        <h1>
          <Link to='/'>LearnWebDev.io</Link>
        </h1>
        <input type='text' placeholder='Search...' />
        <ul>
          <li>
            <Link to='/tutorials/submit'>+ Submit a tutorial</Link>
          </li>

          {user.name ? (
            <li>
              <CurrentUser user={user} />
            </li>
          ) : (
            <li>
              <Link to='/signup'>Sign up / Log in</Link>
            </li>
          )}
        </ul>
      </Nav>
    );
  }
}

export default Navbar;