import React, { Component } from 'react';
import styled from 'styled-components';

import { formatDistance } from 'date-fns';

import Container from './styles/blocks/Container';
import Card from './styles/blocks/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import TutorialItem from './TutorialItem';

const ProfileGrid = styled.div`
  display: grid;
  grid-gap: 5rem;
  grid-template-columns: 22rem auto;

  .profile-sidebar {
    grid-column: 1 / 2;
    text-align: center;
  }

  .profile-content {
    grid-column: 2 / -1;
  }
`;

class InstructorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: {}
    };
  }

  getInstructor = () => {
    const { id } = this.props.match.params;
    fetch(`/api/instructors/${id}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          instructor: data
        })
      );
  };

  componentWillMount() {
    this.getInstructor();
  }

  render() {
    const { instructor } = this.state;
    return (
      <Container>
        <ProfileGrid>
          <Card className='profile-sidebar'>
            <Card.Content>
              <FontAwesomeIcon icon={faUserCircle} size='6x' />
              <Card.Title>{instructor.name}</Card.Title>
              <Card.Subtitle>{instructor.website}</Card.Subtitle>
              <hr />
              <a href={`https://github.com/${instructor.github}`}>
                <FontAwesomeIcon icon={faGithub} size='1x' /> GitHub
              </a>
              <br />
              <a href={`https://twitter.com/${instructor.twitter}`}>
                <FontAwesomeIcon icon={faTwitter} size='1x' /> Twitter
              </a>
            </Card.Content>
          </Card>

          {instructor.tutorials ? (
            <div className='profile-content'>
              {instructor.tutorials.map(tutorial => {
                return (
                  <TutorialItem
                    key={instructor.tutorials.indexOf(tutorial)}
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
                    user={tutorial.users.name}
                    instructor={tutorial.instructors.name}
                    instructorId={tutorial.instructors.id}
                    commentCount={tutorial.commentCount}
                    voteCount={tutorial.voteCount}
                    voteStatus={tutorial.voteStatus}
                    favorited={tutorial.favorited}
                  />
                );
              })}
            </div>
          ) : (
            <h2>no tutorials</h2>
          )}
        </ProfileGrid>
      </Container>
    );
  }
}

export default InstructorPage;
