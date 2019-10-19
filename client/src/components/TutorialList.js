import React, { Component } from 'react';
import SearchContext, { SearchConsumer } from '../SearchContext';

import { formatDistance } from 'date-fns';

import TutorialItem from './TutorialItem';

import Container from './styles/blocks/Container';

class TutorialList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllTutorials();
  }

  componentDidUpdate(prevProps) {
    if (this.props.list !== prevProps.list) {
      this.getAllTutorials();
    }
  }

  getAllTutorials = () => {
    fetch('/api/tutorials')
      .then(res => res.json())
      .then(list => this.props.updateList(list));
  };

  render() {
    return (
      <Container medium>
        <SearchConsumer>
          {({ list }) => (
            <div>
              {list.length ? (
                <div>
                  {/* Render the list of items */}
                  {list.map(tutorial => {
                    return (
                      <TutorialItem
                        key={list.indexOf(tutorial)}
                        id={tutorial.id}
                        title={tutorial.title}
                        url={tutorial.url}
                        date={formatDistance(
                          new Date(tutorial.date),
                          new Date(),
                          {
                            addSuffix: true
                          }
                        )}
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
            </div>
          )}
        </SearchConsumer>
      </Container>
    );
  }
}
TutorialList.contextType = SearchContext;

export default TutorialList;
