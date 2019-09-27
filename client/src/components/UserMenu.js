import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserConsumer } from '../UserContext';

import Dropdown from './styles/blocks/Dropdown';

const UserMenu = () => {
  return (
    <UserConsumer>
      {({ id, name, avatar, logout }) => (
        <Dropdown>
          <button>
            <FontAwesomeIcon icon='user-circle' />
            {name}
          </button>

          <ul>
            <span>
              Signed in as
              <br />
              <strong>{name}</strong>
            </span>
            <hr />

            <a href='/'>
              <li>Your Profile</li>
            </a>
            <a href='/'>
              <li>Your Submissions</li>
            </a>
            <a href='/'>
              <li>Your Favorites</li>
            </a>

            <hr />

            <a href='/'>
              <li>Help</li>
            </a>
            <a href='/'>
              <li>Settings</li>
            </a>
            <button onClick={logout}>
              <li>Logout</li>
            </button>
          </ul>
        </Dropdown>
      )}
    </UserConsumer>
  );
};

export default UserMenu;
