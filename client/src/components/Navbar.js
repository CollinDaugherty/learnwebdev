import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { UserConsumer } from '../UserContext';
import { SearchConsumer } from '../SearchContext';

import UserMenu from './UserMenu';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadow.low};
  max-height: 6rem;

  h1 {
    flex: 1;

    img {
      margin-top: 5px;
    }

    .small-logo {
      max-width: 50px;
      margin-left: 15px;
    }
    .full-logo {
      max-width: 225px;
    }
  }

  form {
    flex: 1;

    input[type='text'] {
      width: 100%;
      border: none;
      border-radius: ${props => props.theme.border.radius};
      background: ${props => props.theme.color.neutral._100};
      padding: 0.8rem;
      font-size: 1.5rem;

      &:focus {
        color: ${props => props.theme.color.primary._700};
      }
    }
  }

  ul {
    flex: 1;
    text-align: right;
    list-style-type: none;

    li {
      display: inline-block;

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

  .mobile {
    display: none;
  }

  @media ${props => props.theme.device.tablet} {
    h1 {
      flex: 2;
    }
    form {
      flex: 3;
    }
    .desktop {
      display: none;
    }
    .mobile {
      display: inline-block;
    }
  }

  @media ${props => props.theme.device.mobile} {
    padding: 0.5rem;
    h1 {
      flex: 1;
    }

    ul {
      font-size: 1rem;
    }
  }
`;

const Navbar = () => {
  let logo;

  if (window.innerWidth < 415) {
    logo = (
      <img
        className='small-logo'
        alt='LearnWebdev.io'
        aria-label='LearnWebDev.io'
        src={require('../lwd_logo_small.svg')}
      ></img>
    );
  } else {
    logo = (
      <img
        className='full-logo'
        alt='LearnWebdev.io'
        aria-label='LearnWebDev.io'
        src={require('../lwd_logo_full.svg')}
      ></img>
    );
  }
  return (
    <UserConsumer>
      {({ id, name, avatar, logout }) => (
        <Nav>
          <h1>
            <Link to='/'>{logo}</Link>
          </h1>

          <SearchConsumer>
            {({ searchTerms, updateSearchTerms, searchTutorials }) => (
              <form method='get' onSubmit={searchTutorials}>
                <input
                  type='text'
                  name='searchTerms'
                  onChange={updateSearchTerms}
                  placeholder='Search...'
                />
              </form>
            )}
          </SearchConsumer>

          <ul className='desktop'>
            <li>
              <Link to='/tutorials/submit'>+ Submit a tutorial</Link>
            </li>

            {id ? (
              <li>
                <UserMenu />
              </li>
            ) : (
              <li>
                <Link to='/signup'>Sign up / Log in</Link>
              </li>
            )}
          </ul>

          <ul className='mobile'>
            <li>
              <Link to='/tutorials/submit'>
                <FontAwesomeIcon icon={faPlus} size='2x' />
              </Link>
            </li>

            {id ? (
              <li>
                <UserMenu size={'2x'} />
              </li>
            ) : (
              <li>
                <Link to='/signup'>
                  <FontAwesomeIcon icon={faSignInAlt} size='2x' />
                </Link>
              </li>
            )}
          </ul>
        </Nav>
      )}
    </UserConsumer>
  );
};

export default Navbar;
