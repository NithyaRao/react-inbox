import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Inbox from './components/Inbox';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container" >
        <div className="jumbotron">
          <h1>React Inbox</h1>
          </div>
        <Inbox />
        </div>
      </div>
    );
  }
}

export default App;
