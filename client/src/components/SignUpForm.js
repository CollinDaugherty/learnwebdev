import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

// Styled-Components
import Btn from './styles/blocks/Button';
import Form from './styles/blocks/Form';
import Card from './styles/blocks/Card';

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      redirect: false,
      name: '',
      email: '',
      password: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    fetch('/api/register/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    });
    this.setState({
      redirect: true
    });
    e.preventDefault();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <h1>Welcome!</h1>

          <label>
            Full Name
            <input
              type='text'
              value={this.state.name}
              name='name'
              placeholder='Full Name'
              onChange={this.handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type='email'
              value={this.state.email}
              name='email'
              placeholder='Email'
              onChange={this.handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type='password'
              value={this.state.password}
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
              required
            />
          </label>

          <Btn full type='submit'>
            Create Account
          </Btn>

          <p>
            Already have an account? <Link to='/login'>Log in</Link>
          </p>
        </Form>
      </Card>
    );
  }
}

export default SignUpForm;
