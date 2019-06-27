import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Styled-Components
import Card from './styles/blocks/Card';
import Btn from './styles/blocks/Button';
import Form from './styles/blocks/Form';

class TutorialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      title: '',
      url: '',
      categories: [],
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

  handleSubmit = e => {
    fetch('/api/tutorials/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: this.state.title,
        url: this.state.url,
        categories: this.state.categories,
        cost: this.state.cost,
        medium: this.state.medium,
        difficulty: this.state.difficulty,
        submittedBy: this.props.user.id
      })
    });
    this.setState({
      redirect: true
    });
    e.preventDefault();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <Card>
        <Card.Content>
          <Form onSubmit={this.handleSubmit}>
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
    );
  }
}

export default TutorialForm;
