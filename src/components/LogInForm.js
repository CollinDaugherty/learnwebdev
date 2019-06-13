import React, { Component } from 'react';

// Styled-Components
import Btn from './styles/blocks/Button';
import Form from './styles/blocks/Form';

class SignUpForm extends Component {
  render() {
    return (
      <Form>
        <h1>Welcome Back!</h1>
        <hr />

        <label htmlFor='email'>Email</label>
        <input type='email' placeholder='Email' />

        <label htmlFor='password'>Password</label>
        <input type='password' placeholder='Password' />

        <Btn>Log In</Btn>

        <p>
          Don't have an account?
          <button onClick={this.props.changeForm}>Sign up</button>
        </p>
      </Form>
    );
  }
}

export default SignUpForm;
