import React, { Component }        from 'react';
import                                  './App.css';
import BottomBar                   from './components/Main/BottomBar';
import MainCard                    from './components/Card/MainCard';
import { Grid, Row, Col }          from 'react-flexbox-grid';	
import {Doughnut}                  from 'react-chartjs-2';
const data = {
        labels: [
            'Immobilier',
            'Financier',
            'Passif'
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
            ],
        }],
       
    };
const options = {
        legend: {
            display: true,
            position: 'right',
            "labels": {
                "fontColor": "rgb(255, 255, 255)"
              }
        },
  };


class App extends Component {


	render() {
	    return (
	        <div className="App">
	        <Grid>
	            <Row around="md">
	            <Col xs={12} md={6}>
	        	<MainCard 
	        		title =     "Patrimoine" 
	        		subHeader = "Composition du patrimoine"
	        		data =      <Doughnut data={data} options = {options} />
	        		collapse =  "Détail de votre patrimoine financier :"
	        	/>
	        	</Col>
	        	<Col xs={12} md={6}>
	        	<MainCard 
			        title =     "Profil financier" 
			        subHeader = "Votre profil d'investisseur"
			        collapse =  "Détail de votre profil financier :"
			    />	
	        	</Col>
	        	<Col xs={12} md={6}>
			    <MainCard 
		        	title =     "Famille" 
		        	subHeader = "Composition de la famille"
		        	collapse =  "Détail de la composition :"
		        />
		       </Col>
		       <Col xs={12} md={6}>
		       <MainCard 
			        title =     "Diversification" 
			        subHeader = "Diversification de votre patrimoine"
			        collapse =  "Détail de la diversification :"
			    />
			 </Col>
			 </Row>
		     </Grid>	
		        
		        <BottomBar />
	        	
	        </div>
	    );
	}
}

export default App;
