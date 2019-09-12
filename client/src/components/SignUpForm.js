import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

// Styled-Components
import Btn from './styles/blocks/Button';
import Form from './styles/blocks/Form';
import Card from './styles/blocks/Card';

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: 'Passwords do not match'
      });
    } else {
      fetch('/api/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      });
      history.push('/');
    }

    e.preventDefault();
  };

  render() {
    return (
      <Card>
        <Card.Content>
          <Form method='post' onSubmit={this.handleSubmit}>
            <h3>{this.state.error}</h3>
            <h1>Welcome!</h1>
            <input
              aria-label='name'
              type='text'
              value={this.state.name}
              name='name'
              placeholder='Name'
              onChange={this.handleChange}
              required
            />
            <input
              aria-label='email'
              type='email'
              value={this.state.email}
              name='email'
              placeholder='Email'
              onChange={this.handleChange}
              required
            />
            <input
              aria-label='password'
              type='password'
              value={this.state.password}
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
              required
            />
            <input
              aria-label='confirm password'
              type='password'
              value={this.state.confirmPassword}
              name='confirmPassword'
              placeholder='Confirm Password'
              onChange={this.handleChange}
              required
            />
            <Btn full type='submit'>
              Create Account
            </Btn>

            <p>
              Already have an account? <Link to='/login'>Log in</Link>
            </p>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

export default SignUpForm;
