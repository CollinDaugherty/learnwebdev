import React, { Component } from 'react';
import Container from './styles/blocks/Container';
import TutorialForm from './TutorialForm';

class Content extends Component {
  render() {
    return (
      <Container>
        <h1>Page Content</h1>
        {this.props.showTutorialForm ? <TutorialForm /> : null}
      </Container>
    );
  }
}

export default Content;
