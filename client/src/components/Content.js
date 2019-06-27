import React, { Component } from 'react';
import TutorialList from './TutorialList';

import Container from './styles/blocks/Container';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  render() {
    return (
      <div>
        <Container medium>
          <TutorialList />
        </Container>
      </div>
    );
  }
}

export default Content;
