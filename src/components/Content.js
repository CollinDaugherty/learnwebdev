import React, { Component } from 'react';
import Container from './styles/blocks/Container';
import TutorialForm from './TutorialForm';
import SignUpLogIn from './SignUpLogIn';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      showSignUp: true
    };
    this.changeForm = this.changeForm.bind(this);
  }

  changeForm() {
    this.setState({
      showSignUp: !this.state.showSignUp
    });
  }

  render() {
    let form;
    if (this.state.showSignUp) {
      form = <SignUpForm changeForm={this.changeForm} />;
    } else {
      form = <LogInForm changeForm={this.changeForm} />;
    }

    console.log(form);

    return (
      <Container>
        <h1>Page Content</h1>
        {this.props.showTutorialForm ? <TutorialForm /> : null}
        {this.props.showSignUpForm ? <SignUpLogIn>{form}</SignUpLogIn> : null}
      </Container>
    );
  }
}

export default Content;
