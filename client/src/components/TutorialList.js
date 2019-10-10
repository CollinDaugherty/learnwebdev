import React, { Component } from 'react';

import SearchContext, { SearchConsumer } from '../SearchContext';

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
                  {list.map(item => {
                    return (
                      <TutorialItem
                        key={list.indexOf(item)}
                        id={item.id}
                        title={item.title}
                        url={item.url}
                        categories={item.categories}
                        cost={item.cost}
                        medium={item.medium}
                        difficulty={item.difficulty}
                        user={item.users.name}
                        instructor={item.instructors.name}
                        commentCount={item.commentCount}
                        voteCount={item.voteCount}
                        voteStatus={item.voteStatus}
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
