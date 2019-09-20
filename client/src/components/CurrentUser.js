import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CurrentUser extends Component {
  render() {
    return (
      <ul>
        <li>
          <button>
            <FontAwesomeIcon icon='user-circle' />
            {this.props.user}
          </button>
        </li>
      </ul>
    );
  }
}

export default CurrentUser;
