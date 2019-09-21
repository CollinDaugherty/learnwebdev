import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

// Styled-Components
import Btn from './styles/blocks/Button';
import Form from './styles/blocks/Form';
import Card from './styles/blocks/Card';

class LogInForm extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
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
    fetch('/api/login/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.isAuthenticated) {
          this.props.loadUser();
          history.push('/');
        } else {
          this.setState({
            error: data
          });
        }
      });
    e.preventDefault();
  };

  render() {
    return (
      <Card>
        <Card.Content>
          <Form method='POST' onSubmit={this.handleSubmit}>
            <h3>{this.state.error}</h3>
            <h1>Welcome Back!</h1>

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

            <Btn full type='submit'>
              Log in
            </Btn>

            <p>
              Don't have an account? <Link to='/signup'>Sign up</Link>
            </p>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

export default LogInForm;
