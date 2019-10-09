import React from 'react';
import Route from 'react-router-dom';

import TutorialList from './TutorialList';

import Container from './styles/blocks/Container';

const Content = props => {
  return (
    <div>
      <Container medium>
        <TutorialList updateList={props.updateList} />
      </Container>
    </div>
  );
};

export default Content;
