import React, { Component } from 'react';
import history from '../history';

import uuidv4 from 'uuid';

import UserContext from '../UserContext';

// Styled-Components
import Card from './styles/blocks/Card';
import Btn from './styles/blocks/Button';
import Form from './styles/blocks/Form';

class TutorialForm extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
      instructorName: '',
      categories: '',
      cost: '',
      medium: '',
      difficulty: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  splitCategories = () => {
    const str = this.state.categories.replace(/\s+/g, '');
    const arr = str.split(',');
    this.setState({
      categories: arr
    });
  };

  handleSubmit = e => {
    const id = uuidv4().slice(0, 8);
    const date = new Date();

    this.splitCategories();

    fetch('/api/tutorials/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        title: this.state.title,
        url: this.state.url,
        instructorName: this.state.instructorName,
        categories: this.state.categories,
        cost: this.state.cost,
        medium: this.state.medium,
        difficulty: this.state.difficulty,
        user: this.context.id,
        posted: date
      })
    });
    history.push('/');
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <Form method='post' onSubmit={this.handleSubmit}>
              <h1>Submit a Tutorial</h1>
              <input
                aria-label='title'
                type='text'
                name='title'
                value={this.state.title}
                onChange={this.handleChange}
                placeholder='Title'
                required
              />

              <input
                aria-label='url'
                type='text'
                name='url'
                value={this.state.url}
                onChange={this.handleChange}
                placeholder='URL'
                required
              />

              <input
                aria-label='instructor'
                type='text'
                name='instructorName'
                value={this.state.instructorName}
                onChange={this.handleChange}
                placeholder='Instructor Name'
                required
              />

              <input
                aria-label='categories'
                type='text'
                name='categories'
                value={this.state.categories}
                onChange={this.handleChange}
                placeholder='HTML, CSS, JS, React, etc.'
                required
              />

              <div className='radio-group'>
                <span>Tags:</span>
                <div>
                  <label>
                    <input
                      type='radio'
                      value='free'
                      onChange={this.handleChange}
                      name='cost'
                      required
                    />
                    Free
                  </label>

                  <label>
                    <input
                      type='radio'
                      value='paid'
                      onChange={this.handleChange}
                      name='cost'
                      required
                    />
                    Paid
                  </label>

                  <label>
                    <input
                      type='radio'
                      onChange={this.handleChange}
                      value='article'
                      name='medium'
                      required
                    />
                    Article
                  </label>

                  <label>
                    <input
                      type='radio'
                      onChange={this.handleChange}
                      value='video'
                      name='medium'
                      required
                    />
                    Video
                  </label>
                </div>
              </div>

              <div className='radio-group'>
                <span>Difficulty:</span>
                <div>
                  <label>
                    <input
                      type='radio'
                      onChange={this.handleChange}
                      value='beginner'
                      name='difficulty'
                      required
                    />
                    Beginner
                  </label>

                  <label>
                    <input
                      type='radio'
                      onChange={this.handleChange}
                      value='advanced'
                      name='difficulty'
                      required
                    />
                    Advanced
                  </label>
                </div>
              </div>

              <Btn full type='submit'>
                Submit Tutorial
              </Btn>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
TutorialForm.contextType = UserContext;

export default TutorialForm;
