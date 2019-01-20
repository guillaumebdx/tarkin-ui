import React, { Component }        from 'react';
import                                  './App.css';
import                                  './styles/familyTree.css';
import BottomBar                   from './components/Main/BottomBar';
import MainCard                    from './components/Card/MainCard';
import { Grid, Row, Col }          from 'react-flexbox-grid';	
import {Doughnut, Radar}           from 'react-chartjs-2';
import OptionsRadar                from './const/OptionsRadar';
import OptionsAsset                from './const/OptionsAsset';
import DataRadarMock               from './Mocks/DataRadarMock';
import FamilyTree                  from './components/Card/FamilyTree';
import AddPropertyDialog           from './components/Dialogs/AddPropertyDialog';
import AddPhysicalPersonDialog     from './components/Dialogs/AddPhysicalPersonDialog';
import PropertyListDialog          from './components/Dialogs/PropertyListDialog';
import DemoDialog                  from './components/Dialogs/DemoDialog';



class App extends Component {

	constructor()
	{
		super();
		this.state = {
				physicalPersons           : [],
				propertiesSum             : [],
				propertyModalIsOpen       : false, 
				physicalPersonModalIsOpen : false, 
				keyModalProperty          : 0,
				propertyListDialogIsOpen  : false,
				demoDialogisOpen          : false,
		}
		
	}
	
	componentDidMount()
	{
		let url          = new URL(window.location.href);
		let searchParams = new URLSearchParams(url.search);
		let userId       = searchParams.get('user');

		if (userId === null) {
			this.setState({demoDialogIsOpen: true})
		}
		this.setState({userId : userId});
		fetch("http://tarkin.harari.io/api/user/" + userId + "/physical-persons")
		.then(response => response.json())
		.then(data => this.setState({ physicalPersons: data }));
		
		fetch("http://tarkin.harari.io/api/user/" + userId + "/properties/sum")
		.then(response => response.json())
		.then(data => this.setState({ propertiesSum: data }));
	}
	openPropertyModal(context) 
	{
		if (context === "modalAddProperties") {
			this.setState({propertyModalIsOpen : true, keyModalProperty : this.state.keyModalProperty + 1})
		}
		if (context === "modalListProperties") {
			this.setState({propertyListDialogIsOpen : true})
		}
		
		
	}
	openPhysicalPersonModal() 
	{
		this.setState({physicalPersonModalIsOpen : true})
	}
	closePhysicalPersonModal() 
	{
		this.setState({physicalPersonModalIsOpen : false})
	}
	closePropertyListModal() 
	{
		this.setState({propertyListDialogIsOpen : false})
	}
	closePropertyModal() 
	{
		this.setState({propertyModalIsOpen : false})
	}
	closeDemoDialog() 
	{
		this.setState({propertyModalIsOpen : false})
	}
	updateSumProperties(data) 
	{
		let url = new URL(window.location.href);
		let searchParams = new URLSearchParams(url.search);
		fetch("http://tarkin.harari.io/api/user/" + searchParams.get('user') + "/properties/sum")
		.then(response => response.json())
		.then(datum => this.setState({ propertiesSum: datum }));
		this.setState({propertyModalIsOpen : false})
	}
	updatePhysicalPersons()
	{
		let url = new URL(window.location.href);
		let searchParams = new URLSearchParams(url.search);
		fetch("http://tarkin.harari.io/api/user/" + searchParams.get('user') + "/physical-persons")
		.then(response => response.json())
		.then(datum => this.setState({ physicalPersons: datum }));
		this.setState({physicalPersonModalIsOpen : false})
	}

	render() {

		const DataAssetMock = {
		        labels: [
		            'Immobilier',
		            'Financier',
		            'Passif'
		        ],
		        datasets: [{
		            data: [this.state.propertiesSum.realEstate, this.state.propertiesSum.financial, 0],
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
		let isUserLoaded = true
		if (this.state.userId === "undefined" || this.state.userId === null) {
			isUserLoaded = false;
		}
	    return (
	        <div className="App">
	        <div>
	        <DemoDialog 
	        open         = {this.state.demoDialogIsOpen} 
	        callback     = {this.closeDemoDialog.bind(this)}
	        userId       = {this.state.userId}
	        />
	        </div>
	        <div key={this.state.propertiesSum.realEstate + this.state.propertiesSum.financial}>
	        <AddPropertyDialog 
	        open         = {this.state.propertyModalIsOpen} 
	        persons      = {this.state.physicalPersons}
	        callback     = {this.closePropertyModal.bind(this)}
	        callbackSave = {this.updateSumProperties.bind(this)}
	        />
	        </div>
	        <div>
	        <AddPhysicalPersonDialog 
	        open         = {this.state.physicalPersonModalIsOpen} 
	        persons      = {this.state.physicalPersons}
	        callback     = {this.closePhysicalPersonModal.bind(this)}
	        callbackSave = {this.updatePhysicalPersons.bind(this)}
	        userId       = {this.state.userId}
	        />
	        </div>
	        
	        <div key={this.state.propertiesSum.realEstate + this.state.propertiesSum.financial +1}>
	        { isUserLoaded && <PropertyListDialog 
	        open         = {this.state.propertyListDialogIsOpen} 
	        callback     = {this.closePropertyListModal.bind(this)}
	        userId       = {this.state.userId}
	        /> }
	        </div>
	        <div className="mainContainer">
		        <Grid>
		            <Row around="md">
		            <Col xs={12} md={6}>
		        	<MainCard 
		        		title     = "Patrimoine" 
		        		subHeader = "Composition du patrimoine"
		        		data      = <Doughnut data={DataAssetMock} options = {OptionsAsset} />
		        		collapse  = "Détail de votre patrimoine financier :"
		        		context   = "properties"
		        		callback  = {this.openPropertyModal.bind(this)}
		        	/>
		        	</Col>
		        	<Col xs={12} md={6}>
		        	<MainCard 
				        title     = "Profil financier" 
				        subHeader = "Votre profil d'investisseur"
				        data      = <Radar data={DataRadarMock} options= {OptionsRadar} />
				        collapse  = "Détail de votre profil financier :"
				    />	
		        	</Col>
		        	<Col xs={12} md={6}>
				    <MainCard 
			        	title     = "Famille" 
			        	subHeader = {"Composition de la famille " } 
				    	data      = <FamilyTree personsData =  {this.state.physicalPersons} />
			        	collapse  = "Détail de la composition :"
			        	context   = "physicalPerson"
			        	callback = {this.openPhysicalPersonModal.bind(this)}
			        />
				       </Col>
				       <Col xs={12} md={6}>
				       <MainCard 
					        title     = "Diversification" 
					        subHeader = "Diversification de votre patrimoine"
					        collapse  = "Détail de la diversification :"
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
