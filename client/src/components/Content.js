import React, { Component } from 'react';
import TutorialList from './TutorialList';

import Container from './styles/blocks/Container';

class Content extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Container medium>
          <TutorialList updateList={this.props.updateList} />
        </Container>
      </div>
    );
  }
}

export default Content;
