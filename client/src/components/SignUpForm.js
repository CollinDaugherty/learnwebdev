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
      pw1: '',
      pw2: '',
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
    if (this.state.pw1 !== this.state.pw2) {
      this.setState({
        error: 'Passwords do not match'
      });
    } else {
      fetch('/api/register/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.pw2
        })
      });
      this.setState({
        redirect: true
      });
    }

    e.preventDefault();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <Card>
        <Card.Content>
          <Form onSubmit={this.handleSubmit}>
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
              value={this.state.pw1}
              name='pw1'
              placeholder='Password'
              onChange={this.handleChange}
              required
            />
            <input
              aria-label='confirm password'
              type='password'
              value={this.state.pw2}
              name='pw2'
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
