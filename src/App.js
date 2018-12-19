import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Icon from '@material-ui/core/Icon';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Icon>star</Icon>
        <Button variant="contained" color="primary">
        Hello World
        </Button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
