import React, { Component } from 'react';

class CurrentUser extends Component {
  render() {
    return (
      <ul>
        <li>
          <button>{this.props.user.name}</button>
        </li>
      </ul>
    );
  }
}

export default CurrentUser;
