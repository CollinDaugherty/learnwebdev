import React, { Component } from 'react';

import Container from './styles/blocks/Container';
import Card from './styles/blocks/Card';

import TutorialItem from './TutorialItem';

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
            />
            {this.state.comments.map(comment => (
              <Card commentCard>
                <Card.Content>
                  <Card.Title>UserName</Card.Title>
                  {comment.body}
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <h2>Tutorial not found</h2>
        )}
      </Container>
    );
  }
}

export default TutorialPage;
