import React, { Component } from 'react';

// Styled-Components
import Card from './styles/blocks/Card';
import Btn from './styles/blocks/Button';
import Form from './styles/blocks/Form';

class TutorialForm extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      url: '',
      instructor: '',
      submittedBy: '',
      categories: [],
      cost: '',
      medium: '',
      difficulty: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Card>
        <Form>
          <h1>Submit a Tutorial</h1>
          <label>
            Title
            <input
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
              placeholder='Title'
              required
            />
          </label>

          <label>
            URL
            <input
              type='text'
              name='url'
              value={this.state.url}
              onChange={this.handleChange}
              placeholder='URL'
              required
            />
          </label>

          <label>
            Categories
            <input
              type='text'
              name='categories'
              value={this.state.categories}
              onChange={this.handleChange}
              placeholder='HTML, CSS, JS, React, etc.'
              required
            />
          </label>

          <fieldset>
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
            </div>

            <div>
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
            </div>
          </fieldset>

          <fieldset>
            <div>
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
            </div>

            <div>
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
          </fieldset>

          <fieldset>
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
            </div>

            <div>
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
          </fieldset>

          <Btn>Submit Tutorial</Btn>
        </Form>
      </Card>
    );
  }
}

export default TutorialForm;
