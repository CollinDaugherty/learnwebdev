import React, { Component } from 'react';

// Styled-Components
import Btn from './styles/blocks/Button';
import Form from './styles/blocks/Form';

class SignUpForm extends Component {
  render() {
    return (
      <Form>
        <h1>Welcome!</h1>
        <hr />

        <label htmlFor='fullname'>Full Name</label>
        <input type='fullname' placeholder='Full Name' />

        <label htmlFor='email'>Email</label>
        <input type='email' placeholder='Email' />

        <label htmlFor='password'>Password</label>
        <input type='password' placeholder='Password' />

        <Btn>Create Account</Btn>

        <p>
          Already have an account?{' '}
          <button onClick={this.props.changeForm}> Log in</button>
        </p>
      </Form>
    );
  }
}

export default SignUpForm;
