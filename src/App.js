import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Icon from '@material-ui/core/Icon';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import {Doughnut} from 'react-chartjs-2';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';

const data = {
		labels: [
			'Red',
			'Green',
			'Yellow'
		],
		datasets: [{
			data: [300, 50, 100],
			backgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
			],
			hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
			]
		}]
	};

class App extends Component {
  render() {
    return (
      <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker  />

      <TimePicker  />

      <DateTimePicker  />
    </MuiPickersUtilsProvider>
      
      <Doughnut data={data} />
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
