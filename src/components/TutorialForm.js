import React, { Component } from 'react';
import Btn from '../styles/blocks/Button';
import Form from '../styles/blocks/Form';

class TutorialForm extends Component {
  render() {
    return (
      <Form>
        <label for='title'>Title</label>
        <input type='text' name='title' placeholder='Title' />

        <label for='url'>URL</label>
        <input type='text' name='url' placeholder='URL' />

        <label for='categories'>Categories</label>
        <input
          type='text'
          name='categories'
          placeholder='HTML, CSS, JS, React, etc.'
        />

        <fieldset>
          <input type='radio' id='free' value='free' name='cost' />
          <label for='free'>Free</label>

          <input type='radio' id='paid' value='paid' name='cost' />
          <label for='paid'>Paid</label>
        </fieldset>

        <fieldset>
          <input type='radio' id='article' value='article' name='medium' />
          <label for='article'>Article</label>

          <input type='radio' id='video' value='video' name='medium' />
          <label for='video'>Video</label>
        </fieldset>

        <fieldset>
          <input
            type='radio'
            id='beginner'
            value='beginner'
            name='difficulty'
          />
          <label for='beginner'>Beginner</label>

          <input
            type='radio'
            id='advanced'
            value='advanced'
            name='difficulty'
          />
          <label for='advanced'>Advanced</label>
        </fieldset>

        <Btn>Submit Tutorial</Btn>
      </Form>
    );
  }
}

export default TutorialForm;
