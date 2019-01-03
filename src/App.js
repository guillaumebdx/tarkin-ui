import React, { Component }        from 'react';
import                                  './App.css';
import BottomBar                   from './components/Main/BottomBar';
import MainCard                    from './components/Card/MainCard';
import { Grid, Row, Col }          from 'react-flexbox-grid';	
import {Doughnut, Radar}           from 'react-chartjs-2';
import OptionsRadar                from './const/OptionsRadar';
import OptionsAsset                from './const/OptionsAsset';
import DataAssetMock               from './Mocks/DataAssetMock';
import DataRadarMock               from './Mocks/DataRadarMock';



class App extends Component {

	constructor()
	{
		super();
		this.state = {
				physicalPersons : [],
		}
		fetch("http://127.0.0.1:8000/api/user/339/physical-persons")
		.then(response => response.json())
		.then(data => this.setState({ physicalPersons: data }));
	}
	
	

	render() {
		let physicalPersonsData = this.state.physicalPersons
		const PhysicalPersons = () => {
			const rows = physicalPersonsData.map((item, index) => 
				<div key={index}>{item.first_name}</div>
			);
			 return <div className='offers'>{rows}</div>;
		}
		

	    return (
	        <div className="App">
	        <div className="mainContainer">
		        <Grid>
		            <Row around="md">
		            <Col xs={12} md={6}>
		        	<MainCard 
		        		title =     "Patrimoine" 
		        		subHeader = "Composition du patrimoine"
		        		data =      <Doughnut data={DataAssetMock} options = {OptionsAsset} />
		        		collapse =  "Détail de votre patrimoine financier :"
		        	/>
		        	</Col>
		        	<Col xs={12} md={6}>
		        	<MainCard 
				        title =     "Profil financier" 
				        subHeader = "Votre profil d'investisseur"
				        data      =  <Radar data={DataRadarMock} options= {OptionsRadar} />
				        collapse =  "Détail de votre profil financier :"
				    />	
		        	</Col>
		        	<Col xs={12} md={6}>
				    <MainCard 
			        	title =     "Famille" 
			        	subHeader = {"Composition de la famille " } 
				    	data = <PhysicalPersons />
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
