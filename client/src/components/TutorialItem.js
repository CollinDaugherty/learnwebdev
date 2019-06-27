import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faCaretSquareUp,
  faHeart,
  faComment
} from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareUp as farCaretSquareUp } from '@fortawesome/free-regular-svg-icons';

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
      categories,
      cost,
      medium,
      difficulty,
      submittedby,
      instructor
    } = this.props;
    return (
      <Card tutorialCard>
        <Card.Upvote onClick={this.onUpvote}>
          {this.state.upvoted ? (
            <FontAwesomeIcon icon={faCaretSquareUp} size='3x' />
          ) : (
            <FontAwesomeIcon icon={farCaretSquareUp} size='3x' />
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
              <span>Steve Rogers</span>
            </p>
          </Card.Instructor>
        </Card.Content>

        <Card.Footer>
          <ul>
            <li>
              Submitted By: <a href='/'>{submittedby}</a>
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
