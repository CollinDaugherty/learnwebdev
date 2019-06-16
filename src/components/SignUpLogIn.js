import React, { Component } from 'react';

// Styled-Components
import Card from './styles/blocks/Card';
import PopUp from './styles/blocks/PopUp';

class SignUpLogIn extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render(props) {
    return (
      <PopUp>
        <Card>{this.props.children}</Card>
      </PopUp>
    );
  }
}

export default SignUpLogIn;
