import React, { Component } from 'react';

import { formatDistance } from 'date-fns';

import TutorialItem from './TutorialItem';
import Container from './styles/blocks/Container';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  getFavorites = () => {
    fetch('/api/favorites')
      .then(res => res.json())
      .then(list =>
        this.setState({
          list: list
        })
      );
  };

  componentDidMount() {
    this.getFavorites();
  }

  render() {
    const { list } = this.state;
    return (
      <Container medium>
        {list.length ? (
          <div>
            <h1>Your Favorites</h1>
            {/* Render the list of items */}
            {list.map(tutorial => {
              return (
                <TutorialItem
                  key={list.indexOf(tutorial)}
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
          <div>
            <h2>No Tutorials Found</h2>
          </div>
        )}
      </Container>
    );
  }
}

export default Favorites;
