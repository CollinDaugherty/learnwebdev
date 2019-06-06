import React, { Component } from 'react';
import Button from '../styles/button';

class TutorialForm extends Component {
  render() {
    return (
      <form>
        <label for='title'>Title</label>
        <input type='text' name='title' />

        <label for='url'>URL</label>
        <input type='text' name='url' />

        <label for='categories'>Categories</label>
        <input
          type='text'
          name='categories'
          placeholder='HTML, CSS, JS, React, etc.'
        />

        <div>
          <input type='radio' id='free' value='free' name='cost' />
          <label for='free'>Free</label>

          <input type='radio' id='paid' value='paid' name='cost' />
          <label for='paid'>Paid</label>
        </div>

        <div>
          <input type='radio' id='article' value='article' name='medium' />
          <label for='article'>Article</label>

          <input type='radio' id='video' value='video' name='medium' />
          <label for='video'>Video</label>
        </div>

        <div>
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
        </div>

        <Button>Submit Tutorial</Button>
      </form>
    );
  }
}

export default TutorialForm;
