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
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.setState({
            redirect: true
          });
        } else {
          this.setState({
            error: 'Incorrect username or password'
          });
        }
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
          <h3>{this.state.error}</h3>
          <h1>Welcome Back!</h1>
          <hr />

          <label htmlFor='email'>Email</label>
          <input
            type='email'
            value={this.state.email}
            name='email'
            id='email'
            placeholder='Email'
            onChange={this.handleChange}
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={this.state.password}
            name='password'
            id='password'
            placeholder='Password'
            onChange={this.handleChange}
          />

          <Btn full type='submit'>
            Log in
          </Btn>

          <p>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </p>
        </Form>
      </Card>
    );
  }
}

export default SignUpForm;
