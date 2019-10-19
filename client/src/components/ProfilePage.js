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

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  getProfile = () => {
    const { id, profileType } = this.props.match.params;
    fetch(`/api/profile/${profileType}/${id}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          profile: data
        })
      );
  };

  componentDidMount() {
    this.getProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getProfile();
    }
  }

  render() {
    const { profile } = this.state;
    return (
      <Container>
        <ProfileGrid>
          <Card className='profile-sidebar'>
            <Card.Content>
              <FontAwesomeIcon icon={faUserCircle} size='6x' />
              <Card.Title>{profile.name}</Card.Title>
              <Card.Subtitle>{profile.website}</Card.Subtitle>
              <hr />
              <a href={`https://github.com/${profile.github}`}>
                <FontAwesomeIcon icon={faGithub} size='1x' /> GitHub
              </a>
              <br />
              <a href={`https://twitter.com/${profile.twitter}`}>
                <FontAwesomeIcon icon={faTwitter} size='1x' /> Twitter
              </a>
            </Card.Content>
          </Card>

          {profile.tutorials ? (
            <div className='profile-content'>
              {profile.tutorials.map(tutorial => {
                return (
                  <TutorialItem
                    key={profile.tutorials.indexOf(tutorial)}
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
                    userId={tutorial.users.id}
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

export default ProfilePage;
