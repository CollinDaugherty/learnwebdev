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
      submittedBy,
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
          <Card.Tag>{cost}</Card.Tag>
          <Card.Tag>{medium}</Card.Tag>
          <Card.Tag>{difficulty}</Card.Tag>
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
              Submitted By: <a href='/'>{submittedBy}</a>
            </li>
            <li>3.2k views</li>
            <li>
              <FontAwesomeIcon icon={faComment} /> 41 Comments
            </li>
            <li>
              <FontAwesomeIcon icon={faHeart} /> Favorite
            </li>
          </ul>
        </Card.Footer>
      </Card>
    );
  }
}

export default TutorialItem;
