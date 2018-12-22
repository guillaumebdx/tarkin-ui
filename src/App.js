import React, { Component }        from 'react';
import                                  './App.css';
import PlusButton                  from './components/Buttons/PlusButton';
import EditButton                  from './components/Buttons/EditButton';
import ExtendedButton              from './components/Buttons/ExtendedButton';
import {Doughnut}                  from 'react-chartjs-2';
import DateFnsUtils                from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { TimePicker }              from 'material-ui-pickers';
import { DatePicker }              from 'material-ui-pickers';
import { DateTimePicker }          from 'material-ui-pickers';
import styled                      from 'styled-components';

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
      <PlusButton context="plus1" />
      <EditButton context="edit" />
      <ExtendedButton context="extended1" label= "Bouton étendu" icon="home" />
      <PlusButton context="plus2" />
      <ExtendedButton context="extended2" label= "Bouton Propriété" icon="face" />
      <header className="App-header">
      </header>
      <Wrapper>
      <Title>Test de styled component!</Title>
      </Wrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker  />


      <TimePicker  />

      <DateTimePicker />
    </MuiPickersUtilsProvider>
      
      <Doughnut data={data} />

      </div>
    );
  }
}

export default App;
