import React, { Component } from 'react';
import Slider               from '@material-ui/lab/Slider';
import Typography           from '@material-ui/core/Typography';

class RadarCollapse extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
				successionValue    : 50,
				fiscalityIrValue   : 50,
				fiscalityIFIValue  : 50,
				rentabilityCtValue : 50,
				rentabilityLtValue : 50,
				retirementValue    : 50,
				
		}
//		this.handleChangeSuccession = this.handleChangeSuccession.bind(this)
	}
    handleChangeSuccession = (event, value) => {
	    this.setState({ successionValue: value });
	    this.props.callbackSuccession(value);
	};
	handleChangeFiscalityIr = (event, value) => {
	    this.setState({ fiscalityIrValue: value });
	    this.props.callbackFiscalityIr(value);
	};
	handleChangeFiscalityIFI = (event, value) => {
	    this.setState({ fiscalityIFIValue: value });
	    this.props.callbackFiscalityIFI(value);
	};
	handleChangeRentabilityCt = (event, value) => {
	    this.setState({ rentabilityCtValue: value });
	    this.props.callbackRentabilityCt(value);
	};
	handleChangeRentabilityLt = (event, value) => {
	    this.setState({ rentabilityLtValue: value });
	    this.props.callbackRentabilityLt(value);
	};
	handleChangeRetirement = (event, value) => {
	    this.setState({ retirementValue: value });
	    this.props.callbackRetirement(value);
	};

	render() {
		return (
				<div>
					<div>
						<Typography id="label" className="sliderLabel" key="1">Succession</Typography>
						<Slider
						    key             = "2"
						    value           = {this.state.successionValue}
						    aria-labelledby = "label"
						    onChange        = {this.handleChangeSuccession}
						    className       = "slider"
						/>	
					</div>
					<div>
						<Typography id="labelFiscalityIr" className="sliderLabel" key="3">Optimisation de mon impôt sur le revenu</Typography>
						<Slider
						    key             = "4"
						    value           = {this.state.fiscalityIrValue}
						    aria-labelledby = "labelFiscality"
						    onChange        = {this.handleChangeFiscalityIr}
						    className       = "slider"
						/>	
					</div>
					<div>
						<Typography id="labelFiscalityIfi" className="sliderLabel" key="5">optimisation de mon impôt sur la fortune immobilière</Typography>
						<Slider
						    key             = "6"
						    value           = {this.state.fiscalityIFIValue}
						    aria-labelledby = "labelFiscalityIfi"
						    onChange        = {this.handleChangeFiscalityIFI}
						    className       = "slider"
						/>	
					</div>
					<div>
						<Typography id="labelRentabilityCt" className="sliderLabel" key="8">Recherche de rentabilité Court Terme </Typography>
						<Slider
						    key             = "8"
						    value           = {this.state.rentabilityCtValue}
						    aria-labelledby = "labelRentabilityCt"
						    onChange        = {this.handleChangeRentabilityCt}
						    className       = "slider"
						/>	
					</div>
					<div>
						<Typography id="labelRentabilityLt" className="sliderLabel" key="9">Recherche de rentabilité Long Terme </Typography>
						<Slider
						    key             = "10"
						    value           = {this.state.rentabilityLtValue}
						    aria-labelledby = "labelRentabilityLt"
						    onChange        = {this.handleChangeRentabilityLt}
						    className       = "slider"
						/>	
					</div>
					<div>
						<Typography id="labelRetirement" className="sliderLabel" key="11">Préparation de la retraite </Typography>
						<Slider
						    key             = "10"
						    value           = {this.state.retirementValue}
						    aria-labelledby = "labelRetirement"
						    onChange        = {this.handleChangeRetirement}
						    className       = "slider"
						/>	
					</div>
					
				</div>
		)
	}

}
export default RadarCollapse;