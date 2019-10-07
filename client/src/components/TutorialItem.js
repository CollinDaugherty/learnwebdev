import React, { Component } from 'react';
import history from '../history';
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
      tutorial_id: this.props.id,

      voteCount: this.props.voteCount,
      voteStatus: this.props.voteStatus
    };
  }

  onVote = event => {
    if (!this.context.user) {
      history.push('/login');
      return null;
    }

    let value = event.target.value;
    if (Number(value) === Number(this.state.voteStatus)) {
      value = 0;
    }

    let finalValue;
    if (value > 0) {
      finalValue = 1;
    } else if (value < 0) {
      finalValue = -1;
    } else {
      finalValue = 0;
    }

    console.log(finalValue);

    fetch('/api/tutorials/vote', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tutorial_id: this.state.tutorial_id,
        user_id: this.context.id,
        value: finalValue
      })
    });

    if (
      Number(finalValue) === 0 &&
      Number(this.state.voteStatus) === Number(1)
    ) {
      this.setState(prevState => ({
        voteStatus: 0,
        voteCount: Number(prevState.voteCount) - 1
      }));
    } else if (
      Number(finalValue) === 0 &&
      Number(this.state.voteStatus) === Number(-1)
    ) {
      this.setState(prevState => ({
        voteStatus: 0,
        voteCount: Number(prevState.voteCount) + 1
      }));
    } else {
      this.setState(prevState => ({
        voteStatus: finalValue,
        voteCount: Number(prevState.voteCount) + Number(finalValue)
      }));
    }
  };

  render() {
    const {
      title,
      url,
      cost,
      medium,
      difficulty,
      user,
      instructor
    } = this.props;

    return (
      <Card tutorialCard>
        <Card.VoteContainer>
          {this.state.voteStatus === 1 ? (
            <Card.Vote upvote upvoted onClick={this.onVote} value={1} />
          ) : (
            <Card.Vote upvote onClick={this.onVote} value={1} />
          )}

          <Card.VoteCount>{this.state.voteCount}</Card.VoteCount>

          {this.state.voteStatus === -1 ? (
            <Card.Vote downvote downvoted onClick={this.onVote} value={-1} />
          ) : (
            <Card.Vote downvote onClick={this.onVote} value={-1} />
          )}
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
