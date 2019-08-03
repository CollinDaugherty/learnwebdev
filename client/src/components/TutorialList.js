import React, { Component } from 'react';

import TutorialItem from './TutorialItem';

class TutorialList extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.getTutorials();
  }

  getTutorials = () => {
    fetch('/api/tutorials')
      .then(res => res.json())
      .then(list => this.setState({ list }));
  };

  render() {
    const { list } = this.state;

    return (
      <div>
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map(item => {
              return (
                <TutorialItem
                  title={item.title}
                  url={item.url}
                  categories={item.categories}
                  cost={item.cost}
                  medium={item.medium}
                  difficulty={item.difficulty}
                  user={item.users.name}
                  instructor={item.instructors.name}
                  views={item.views}
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
    );
  }
}

export default TutorialList;
