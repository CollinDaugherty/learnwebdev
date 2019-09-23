import React from 'react';
import TutorialList from './TutorialList';

import Container from './styles/blocks/Container';

const Content = () => {
  return (
    <div>
      <Container medium>
        <TutorialList updateList={this.props.updateList} />
      </Container>
    </div>
  );
};

export default Content;
