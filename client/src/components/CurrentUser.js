import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserContext, { UserConsumer } from '../UserContext';

class CurrentUser extends Component {
  render() {
    return (
      <UserConsumer>
        {({ id, name, avatar }) => (
          <ul>
            <li>
              <button>
                <FontAwesomeIcon icon='user-circle' />
                {name}
              </button>
            </li>
          </ul>
        )}
      </UserConsumer>
    );
  }
}
CurrentUser.contextType = UserContext;

export default CurrentUser;
