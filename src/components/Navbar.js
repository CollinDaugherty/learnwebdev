import React, { Component } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  background: ${props => props.theme.color.bg};
  //box-shadow: ${props => props.theme.boxShadow};
  padding: 2rem;

  h1 {
    flex: 1;
  }

  input[type=text] {
    flex: 1;
    border: none;
    border-radius: ${props => props.theme.border.borderRadius};
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
    }
  }
`;

class Navbar extends Component {
  render() {
    return (
      <Nav>
        <h1>LearnWebDev.io</h1>
        <input type='text' placeholder='Search...' />
        <ul>
          <li>
            <button onClick={this.props.renderTutorialForm}>
              + Submit a tutorial
            </button>
          </li>
          <li>
            <a href='/'>Sign up</a>
          </li>
          <li>
            <a href='/'>Log in</a>
          </li>
        </ul>
      </Nav>
    );
  }
}

export default Navbar;
