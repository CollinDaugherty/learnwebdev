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
        <input type='text' name='categories' />

        <div>
          <input type='radio' id='free' name='cost' />
          <label for='free'>Free</label>

          <input type='radio' id='paid' name='cost' />
          <label for='paid'>Paid</label>
        </div>

        <div>
          <input type='radio' id='article' name='medium' />
          <label for='article'>Article</label>

          <input type='radio' id='video' name='medium' />
          <label for='video'>Video</label>
        </div>

        <div>
          <input type='radio' id='beginner' name='difficulty' />
          <label for='beginner'>Beginner</label>

          <input type='radio' id='advanced' name='difficulty' />
          <label for='advanced'>Advanced</label>
        </div>

        <Button>Submit Tutorial</Button>
      </form>
    );
  }
}

export default TutorialForm;
