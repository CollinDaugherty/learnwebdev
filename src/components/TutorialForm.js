import React, { Component } from 'react';
import Card from '../styles/blocks/Card';
import Btn from '../styles/blocks/Button';
import Form from '../styles/blocks/Form';

class TutorialForm extends Component {
  render() {
    return (
      <Card>
        <Form>
          <label for='title'>Title</label>
          <input type='text' name='title' id='title' placeholder='Title' />

          <label for='url'>URL</label>
          <input type='text' name='url' id='url' placeholder='URL' />

          <label for='categories'>Categories</label>
          <input
            type='text'
            name='categories'
            id='categories'
            placeholder='HTML, CSS, JS, React, etc.'
          />

          <fieldset>
            <div>
              <input type='radio' id='free' value='free' name='cost' />
              <label for='free'>Free</label>
            </div>

            <div>
              <input type='radio' id='paid' value='paid' name='cost' />
              <label for='paid'>Paid</label>
            </div>
          </fieldset>

          <fieldset>
            <div>
              <input type='radio' id='article' value='article' name='medium' />
              <label for='article'>Article</label>
            </div>

            <div>
              <input type='radio' id='video' value='video' name='medium' />
              <label for='video'>Video</label>
            </div>
          </fieldset>

          <fieldset>
            <div>
              <input
                type='radio'
                id='beginner'
                value='beginner'
                name='difficulty'
              />
              <label for='beginner'>Beginner</label>
            </div>

            <div>
              <input
                type='radio'
                id='advanced'
                value='advanced'
                name='difficulty'
              />
              <label for='advanced'>Advanced</label>
            </div>
          </fieldset>

          <Btn>Submit Tutorial</Btn>
        </Form>
      </Card>
    );
  }
}

export default TutorialForm;
