import React, { Component } from 'react';
import Container from './styles/blocks/Container';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.getList();
    console.log(this.state.list);
  }

  getList = () => {
    fetch('/list')
      .then(res => res.json())
      .then(list => this.setState({ list }));
  };

  render() {
    const { list } = this.state;

    return (
      <Container>
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map(item => {
              return <div>{item}</div>;
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )}
      </Container>
    );
  }
}

export default Content;
