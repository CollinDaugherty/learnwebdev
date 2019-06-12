import React from 'react';
import Card from './styles/blocks/Card';

function TutorialItem(props) {
  return (
    <Card>
      {props.data.title}
      <br />
      {props.data.url}
      <br />
      {props.data.categories}
      <br />
      {props.data.instructor}
      <br />
      {props.data.submittedBy}
      <br />
      {props.data.cost}
      <br />
      {props.data.medium}
      <br />
      {props.data.difficulty}
    </Card>
  );
}

export default TutorialItem;
