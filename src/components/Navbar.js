import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  background: ${props => props.theme.color.bg};
  padding: 2rem;

  h1 {
    flex: 1;
  }

  input[type='text'] {
    flex: 1;
    border: none;
    border-radius: ${props => props.theme.border.radius};
    background: ${props => props.theme.color.alternateBg};
    padding: 0.8rem;
    font-size: 1.5rem;

    &:focus {
      color: ${props => props.theme.color.primary};
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
          background: ${props => props.theme.color.alternateBg};
        }
      }
    }
  }
`;

class Navbar extends Component {
  render() {
    return (
      <Nav>
        <h1>
          <Link to='/'>LearnWebDev.io</Link>
        </h1>
        <input type='text' placeholder='Search...' />
        <ul>
          <li>
            <Link to='/submit'>+ Submit a tutorial</Link>
          </li>

          <li>
            <Link to='/signup'>Sign up / Log in</Link>
          </li>
        </ul>
      </Nav>
    );
  }
}

export default Navbar;
