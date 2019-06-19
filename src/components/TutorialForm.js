import React, { Component } from 'react';

// Styled-Components
import Card from './styles/blocks/Card';
import Btn from './styles/blocks/Button';
import Form from './styles/blocks/Form';
import PopUp from './styles/blocks/PopUp';

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
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
            placeholder='Title'
          />

          <label htmlFor='url'>URL</label>
          <input
            type='text'
            name='url'
            value={this.state.url}
            onChange={this.handleChange}
            placeholder='URL'
          />

          <label htmlFor='categories'>Categories</label>
          <input
            type='text'
            name='categories'
            value={this.state.categories}
            onChange={this.handleChange}
            placeholder='HTML, CSS, JS, React, etc.'
          />

          <fieldset>
            <div>
              <input
                type='radio'
                value='free'
                onChange={this.handleChange}
                name='cost'
              />
              <label htmlFor='free'>Free</label>
            </div>

            <div>
              <input
                type='radio'
                value='paid'
                onChange={this.handleChange}
                name='cost'
              />
              <label htmlFor='paid'>Paid</label>
            </div>
          </fieldset>

          <fieldset>
            <div>
              <input
                type='radio'
                onChange={this.handleChange}
                value='article'
                name='medium'
              />
              <label htmlFor='article'>Article</label>
            </div>

            <div>
              <input
                type='radio'
                onChange={this.handleChange}
                value='video'
                name='medium'
              />
              <label htmlFor='video'>Video</label>
            </div>
          </fieldset>

          <fieldset>
            <div>
              <input
                type='radio'
                onChange={this.handleChange}
                value='beginner'
                name='difficulty'
              />
              <label htmlFor='beginner'>Beginner</label>
            </div>

            <div>
              <input
                type='radio'
                onChange={this.handleChange}
                value='advanced'
                name='difficulty'
              />
              <label htmlFor='advanced'>Advanced</label>
            </div>
          </fieldset>

          <Btn>Submit Tutorial</Btn>
        </Form>
      </Card>
    );
  }
}

export default TutorialForm;
