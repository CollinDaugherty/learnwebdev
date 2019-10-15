import React, { Component } from 'react';
import history from '../history';
import UserContext from '../UserContext';

import uuidv4 from 'uuid';
import { formatDistance } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import Container from './styles/blocks/Container';
import Card from './styles/blocks/Card';
import Form from './styles/blocks/Form';
import Btn from './styles/blocks/Button';

import TutorialItem from './TutorialItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faComment,
  faClock
} from '@fortawesome/free-solid-svg-icons';

class TutorialPage extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      tutorial: {},
      user: {},
      instructor: {},
      comments: {},

      commentBody: ''
    };
  }

  formatReply = event => {
    const parentId = event.target.parentElement.parentElement.parentElement.id;
    const parentUserString =
      event.target.previousSibling.previousSibling.textContent;
    const parentUser = parentUserString.trim();
    const parentText = event.target.dataset.text;

    this.setState({
      commentBody: `> [@${parentUser}](#${parentId}) \n\n> ${parentText} \n\n`
    });
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({
      commentBody: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.commentBody.length) {
      return null;
    }
    const id = uuidv4().slice(0, 8);
    const date = new Date();

    if (!this.context.id) {
      return history.push('/login');
    }
    fetch(`/api/tutorials/${this.state.tutorial.id}/comments`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        user_id: this.context.id,
        tutorial_id: this.state.tutorial.id,
        body: this.state.commentBody,
        date: date
      })
    });
    this.setState(prevState => ({
      commentBody: '',
      ...prevState.comments.push({
        id: id,
        user_id: this.context.id,
        tutorial_id: this.state.tutorial.id,
        body: this.state.commentBody,
        date: date,
        username: this.context.name
      })
    }));
  };

  getTutorial = () => {
    const { pageId } = this.props.match.params;
    fetch(`/api/tutorials/${pageId}`)
      .then(res => res.json())
      .then(response =>
        this.setState({
          tutorial: response,
          user: response.users,
          instructor: response.instructors,
          comments: response.comments
        })
      );
  };

  componentDidMount() {
    this.getTutorial();
  }

  render() {
    const { tutorial, user, instructor } = this.state;
    const comments = this.state.comments;

    return (
      <Container Medium>
        {tutorial.id ? (
          <div>
            <TutorialItem
              key={tutorial.id}
              id={tutorial.id}
              title={tutorial.title}
              url={tutorial.url}
              date={formatDistance(new Date(tutorial.date), new Date(), {
                addSuffix: true
              })}
              categories={tutorial.categories}
              cost={tutorial.cost}
              medium={tutorial.medium}
              difficulty={tutorial.difficulty}
              user={user.name}
              instructor={instructor.name}
              voteCount={tutorial.voteCount}
              voteStatus={tutorial.voteStatus}
              commentCount={tutorial.commentCount}
              favorited={tutorial.favorited}
            />

            <br />

            <Container medium>
              <Form method='post' onSubmit={this.handleSubmit}>
                <textarea
                  rows='8'
                  name='commentBody'
                  value={this.state.commentBody}
                  onChange={this.handleChange}
                ></textarea>
                <Btn type='submit'>Submit</Btn>
              </Form>
            </Container>

            <br />

            {comments.length ? (
              <Container medium>
                {comments.map(comment => (
                  <Card commentCard id={comment.id} key={comment.id}>
                    <Card.Content>
                      <ReactMarkdown source={comment.body} />
                    </Card.Content>
                    <Card.Footer>
                      <ul>
                        <li>
                          <FontAwesomeIcon icon={faUserCircle} size='1x' />{' '}
                          {comment.username}
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faClock} size='1x' />{' '}
                          {formatDistance(new Date(comment.date), new Date(), {
                            addSuffix: true
                          })}
                        </li>
                        <li data-text={comment.body} onClick={this.formatReply}>
                          <FontAwesomeIcon icon={faComment} size='1x' /> Reply
                        </li>
                      </ul>
                    </Card.Footer>
                  </Card>
                ))}
              </Container>
            ) : (
              <h2>No comments yet</h2>
            )}
          </div>
        ) : (
          <h2>Tutorial not found</h2>
        )}
      </Container>
    );
  }
}

export default TutorialPage;
