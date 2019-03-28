import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';
import TextField            from '@material-ui/core/TextField';

class Step7 extends Component
{


    constructor(props)
	{
        super(props)
        /** fetch in construct because componentWillReceiveProps does not work in modal */
        fetch("http://tarkin.harari.io/api/properties/financial")
            .then(response => response.json())
            .then(data => this.setState({ financialList: data }))
        fetch("http://tarkin.harari.io/api/properties/realestate")
            .then(response => response.json())
            .then(data => this.setState({ realEstateList: data }));
		this.state = {
                financialList  : [],
                realEstateList : [],
                isErrorName    : false,
                name           : '',
		} 
		this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (name) => event => {
        this.setState({
	        [name]: event.target.value,
        });
        let stepData = new Map();
        stepData.set(name, event.target.value);
        this.props.callback(stepData);
        
	  };
    render()
    {
        const FinancialList = () => { 
			return (
					<TextField
					  error = {this.state.isErrorPropertyType}
			          id="outlined-select-currency-native"
			          select
			          label="Placement"
			          onChange ={this.handleChange('financialId')}
					  value = {this.props.financialId}
					  
			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			        >
					    <option key="0" value = ""></option>
			          {this.state.financialList.map(option => (
			            <option key={option.id} value={option.id}>
			              {option.name}
			            </option>
			          ))}
			        </TextField>
			);
        }
        const RealEstateList = () => { 
			return (
					<TextField
					  error = {this.state.isErrorPropertyType}
					  id="outlined-select-currency-native"
			          select
			          label="Bien immobilier"
			          onChange ={this.handleChange('realEstateId')}
					  value = {this.props.realEstateId}

			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			        >
					   <option key="0" value = ""></option>
			          {this.state.realEstateList.map(option => (
			            <option key={option.id} value={option.id}>
			              {option.name}
			            </option>
			          ))}
			        </TextField>
			);
		}
        return (
            <div className="center stepContent">
                <Typography variant='title'>
                Type de {this.props.propertyType === "checkedFinancial" ? ' placement' : ' bien immobilier'}
                </Typography>
                <Typography variant='caption'>
                Sélectionnez ici le type de {this.props.propertyType === "checkedFinancial" ? ' placement' : ' bien immobilier'}
                </Typography>
                <div>
                {this.props.propertyType === "checkedFinancial" && <FinancialList />}
                {this.props.propertyType === "checkedRealEstate" && <RealEstateList />}
		        </div>
            </div>
        )
    }


}
export default Step7;