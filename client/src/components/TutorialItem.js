import React, { Component } from 'react';

import UserContext from '../UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faHeart,
  faComment
} from '@fortawesome/free-solid-svg-icons';

import Card from './styles/blocks/Card';

class TutorialItem extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      tutorial_id: this.props.id
    };
  }

  onVote = event => {
    const value = event.target.value;
    console.log(value);
    fetch('/api/tutorials/vote', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tutorial_id: this.state.tutorial_id,
        user_id: this.context.id,
        value: value
      })
    });
  };

  render() {
    const {
      title,
      url,
      cost,
      medium,
      difficulty,
      user,
      instructor,
      voteCount
    } = this.props;

    return (
      <Card tutorialCard>
        <Card.VoteContainer>
          <Card.Vote upvote onClick={this.onVote} value={1} />
          <span>{voteCount}</span>
          <Card.Vote downvote onClick={this.onVote} value={-1} />
        </Card.VoteContainer>

        <Card.Content>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle href={url}>{url}</Card.Subtitle>

          <Card.Instructor>
            <FontAwesomeIcon icon={faUserCircle} size='2x' />
            <p>
              Instructor:
              <br />
              {instructor ? <span>{instructor}</span> : <span>unknown</span>}
            </p>
          </Card.Instructor>
        </Card.Content>

        <Card.Footer>
          <ul>
            <li>
              <FontAwesomeIcon icon={faComment} /> 41 Comments
            </li>
            <li>
              <FontAwesomeIcon icon={faHeart} /> Favorite
            </li>
            <li>
              Submitted By: <a href='/'>{user}</a>
            </li>
            <Card.Tag>{difficulty}</Card.Tag>
            <Card.Tag>{medium}</Card.Tag>
            <Card.Tag>{cost}</Card.Tag>
          </ul>
        </Card.Footer>
      </Card>
    );
  }
}

export default TutorialItem;
