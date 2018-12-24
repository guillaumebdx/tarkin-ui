import React, { Component }        from 'react';
import                                  './App.css';
import BottomBar                   from './components/Main/BottomBar';
import MainCard                    from './components/Card/MainCard';
import { Grid, Row, Col }          from 'react-flexbox-grid';	
import {Doughnut, Radar}           from 'react-chartjs-2';
import OptionsRadar                from './const/OptionsRadar';
import OptionsAsset                from './const/OptionsAsset';


const DataRadar = {
  labels: ['Succession', 'Fiscalité IR', 'Fiscalité IFI', 'Rentabilité CT', 'Rentabilité LT', 'Retraite',],
  datasets: [
    {
      label: 'Mes priorités',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [74, 40, 60, 89, 96, 100],

    }
  ]
};
const DataAsset = {
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


class App extends Component {


	render() {
	    return (
	        <div className="App">
	        <div className="mainContainer">
		        <Grid>
		            <Row around="md">
		            <Col xs={12} md={6}>
		        	<MainCard 
		        		title =     "Patrimoine" 
		        		subHeader = "Composition du patrimoine"
		        		data =      <Doughnut data={DataAsset} options = {OptionsAsset} />
		        		collapse =  "Détail de votre patrimoine financier :"
		        	/>
		        	</Col>
		        	<Col xs={12} md={6}>
		        	<MainCard 
				        title =     "Profil financier" 
				        subHeader = "Votre profil d'investisseur"
				        data      =  <Radar data={DataRadar} options= {OptionsRadar} />
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
			 </div>
			 <BottomBar />
			 </div>
	    );
	}
}

export default App;
