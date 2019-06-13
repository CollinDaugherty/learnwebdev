import React, { Component } from 'react';

// Styled-Components
import Card from './styles/blocks/Card';
import Container from './styles/blocks/Container';

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
      <Container small>
        <Card>{this.props.children}</Card>
      </Container>
    );
  }
}

export default SignUpLogIn;
