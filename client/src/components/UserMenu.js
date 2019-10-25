import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPlusSquare,
  faHeart,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import { UserConsumer } from '../UserContext';

import Dropdown from './styles/blocks/Dropdown';

const UserMenu = props => {
  return (
    <UserConsumer>
      {({ id, name, avatar, logout }) => (
        <Dropdown>
          <button>
            <FontAwesomeIcon icon='user-circle' size={props.size} />
          </button>

          <ul>
            <span>
              Signed in as
              <br />
              <strong>{name}</strong>
            </span>
            <hr />

            <Link to={`/profile/user/${id}`}>
              <li>
                <FontAwesomeIcon icon={faUser} /> Your Profile
              </li>
            </Link>
            <Link to={`/profile/user/${id}`}>
              <li>
                <FontAwesomeIcon icon={faPlusSquare} /> Your Submissions
              </li>
            </Link>
            <Link to={`/favorites`}>
              <li>
                <FontAwesomeIcon icon={faHeart} /> Your Favorites
              </li>
            </Link>

            <hr />

            {/* <a href='/'>
              <li>Help</li>
            </a>
            <a href='/'>
              <li>Settings</li>
            </a> */}
            <button onClick={logout}>
              <li>
                {' '}
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </li>
            </button>
          </ul>
        </Dropdown>
      )}
    </UserConsumer>
  );
};

export default UserMenu;
