import React, { Component } from 'react';
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
import styled from 'styled-components';

const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`;
const Wrapper = styled.section`
padding: 4em;
background: papayawhip;
`;
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
      <header className="App-header">
      </header>
      <Wrapper>
      <Title>Test de styled component!</Title>
      </Wrapper>
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
      </div>
    );
  }
}

export default App;
