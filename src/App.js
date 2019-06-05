import React, { Component } from 'react';
import './App.css';

import Nav from './components/Nav';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

export default App;
