import React, { Component } from 'react';

import Container from './styles/blocks/Container';
import Card from './styles/blocks/Card';
import Form from './styles/blocks/Form';
import Button from './styles/blocks/Button';

import TutorialItem from './TutorialItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faComment } from '@fortawesome/free-solid-svg-icons';

class TutorialPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorial: {},
      user: {},
      instructor: {},
      comments: {}
    };
  }

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
    // console.log('clg: ', comments[0]);

    return (
      <Container Medium>
        {tutorial.id ? (
          <div>
            <TutorialItem
              key={tutorial.id}
              id={tutorial.id}
              title={tutorial.title}
              url={tutorial.url}
              categories={tutorial.categories}
              cost={tutorial.cost}
              medium={tutorial.medium}
              difficulty={tutorial.difficulty}
              user={user.name}
              instructor={instructor.name}
              voteCount={tutorial.voteCount}
              voteStatus={tutorial.voteStatus}
              commentCount={tutorial.commentCount}
            />

            <br />

            <Container medium>
              <Form>
                <textarea rows='8'></textarea>
                <Button>Submit</Button>
              </Form>
            </Container>

            <br />

            {comments.length ? (
              <Container medium>
                {comments.map(comment => (
                  <Card commentCard key={comment.id}>
                    <Card.Content>{comment.body}</Card.Content>
                    <Card.Footer>
                      <ul>
                        <li>
                          <FontAwesomeIcon icon={faUserCircle} size='1x' />{' '}
                          {comment.username}
                        </li>
                        <li>2 hours ago</li>
                        <li>
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
