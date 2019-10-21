import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

      voteCount: Number(this.props.voteCount),
      voteStatus: Number(this.props.voteStatus),

      favorited: this.props.favorited
    };
  }

  addFavorite = event => {
    if (!this.context.id) {
      history.push('/login');
      return null;
    }

    console.log('favorited');

    this.setState(prevState => ({
      favorited: !prevState.favorited
    }));

    fetch(`/api/tutorials/${this.state.tutorial_id}/favorite`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tutorial_id: this.state.tutorial_id,
        user_id: this.context.id
      })
    });
  };

  onVote = event => {
    if (!this.context.id) {
      history.push('/login');
      return null;
    }

    let value = Number(event.target.value);
    if (value === this.state.voteStatus) {
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

    fetch('/api/tutorials/vote', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tutorial_id: this.state.tutorial_id,
        user_id: this.context.id,
        value: finalValue
      })
    });

    if (finalValue === 0 && this.state.voteStatus === 1) {
      this.setState(prevState => ({
        voteStatus: 0,
        voteCount: prevState.voteCount - 1
      }));
    } else if (finalValue === 0 && this.state.voteStatus === -1) {
      this.setState(prevState => ({
        voteStatus: 0,
        voteCount: prevState.voteCount + 1
      }));
    } else if (finalValue === -1 && this.state.voteStatus === 1) {
      this.setState(prevState => ({
        voteStatus: -1,
        voteCount: prevState.voteCount - 2
      }));
    } else if (finalValue === 1 && this.state.voteStatus === -1) {
      this.setState(prevState => ({
        voteStatus: 1,
        voteCount: prevState.voteCount + 2
      }));
    } else {
      this.setState(prevState => ({
        voteStatus: finalValue,
        voteCount: prevState.voteCount + finalValue
      }));
    }
  };

  render() {
    const {
      id,
      title,
      url,
      date,
      cost,
      medium,
      difficulty,
      user,
      userId,
      instructor,
      instructorId,
      commentCount
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
          <Card.Title>
            <Link to={`/tutorials/page/${id}`}>{title}</Link>
          </Card.Title>
          <Card.Subtitle href={url}>{url}</Card.Subtitle>

          <Card.Instructor>
            <FontAwesomeIcon icon={faUserCircle} size='2x' />
            <p>
              Instructor:
              <br />
              {instructor ? (
                <span>
                  <Link to={`/profile/instructors/${instructorId}`}>
                    {instructor}
                  </Link>
                </span>
              ) : (
                <span>unknown</span>
              )}
            </p>
          </Card.Instructor>
        </Card.Content>

        <Card.Footer>
          <ul>
            <li>
              <Link to={`/tutorials/page/${id}`}>
                <FontAwesomeIcon icon={faComment} /> {commentCount} Comments
              </Link>
            </li>
            {this.state.favorited ? (
              <li
                style={{ color: 'HSL(216,11%,49%)' }}
                onClick={this.addFavorite}
              >
                <FontAwesomeIcon style={{ color: '#ff0266' }} icon={faHeart} />{' '}
                Favorited
              </li>
            ) : (
              <li onClick={this.addFavorite}>
                <FontAwesomeIcon icon={faHeart} /> Favorite
              </li>
            )}
            <li>
              submitted <span>{date}</span> by{' '}
              <Link to={`/profile/user/${userId}`}>{user}</Link>
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
