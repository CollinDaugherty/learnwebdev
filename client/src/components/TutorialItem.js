import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faArrowUp,
  faHeart,
  faComment
} from '@fortawesome/free-solid-svg-icons';

import Card from './styles/blocks/Card';

class TutorialItem extends Component {
  constructor() {
    super();
    this.state = {
      upvoted: false
    };
  }

  onUpvote = () => {
    this.setState({
      upvoted: !this.state.upvoted
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
      instructor
    } = this.props;
    return (
      <Card tutorialCard>
        <Card.Upvote onClick={this.onUpvote}>
          {this.state.upvoted ? (
            <FontAwesomeIcon icon={faArrowUp} size='3x' />
          ) : (
            <FontAwesomeIcon icon={faArrowUp} size='2x' />
          )}
        </Card.Upvote>
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
