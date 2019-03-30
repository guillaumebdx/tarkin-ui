import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';
import TextField            from '@material-ui/core/TextField';

class Step8 extends Component
{


    constructor(props)
	{
        super(props)
        /** fetch in construct because componentWillReceiveProps does not work in modal */
        fetch("http://tarkin.harari.io/api/acquirement-types")
            .then(response => response.json())
            .then(data => this.setState({ acquisitionTypeList: data }));
		this.state = {
                acquisitionTypeList : [],
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
        let spouse1   = '';
		let spouse2   = '';
		let idSpouse1 = '';
        let idSpouse2 = '';
        let spouses   = [];
        this.props.persons.map(person => {
			if (person.family_position === 'Conjoint') {
				spouses.push(person);
            }
        })
		if (spouses.length > 0) {
			spouse1   = spouses[0].first_name
			idSpouse1 = spouses[0].id
		}
		if (spouses.length > 1) {
			spouse2   = spouses[1].first_name
			idSpouse2 = spouses[1].id
        }
        let isSingle = true;
        if (spouses.length === 2) {
            isSingle = false;
        }

        let displayOwner = false;
		if (isSingle === false) {
			displayOwner = true;
		}

		let lawPosition = "";
		this.props.persons.forEach(function(value) {
			if (value.cradle === true) {
				lawPosition = value.law_position;
			}
		})
		let displayAcquirementType = false;
		if (displayOwner === true && lawPosition === "common-community" && !isSingle) {
			displayAcquirementType = true;
        }

		const OwnerListCommonMarriage = [
			{
				id   : idSpouse1,
				name : "Acquis par " + spouse1 
			},
			
		]
		if (spouses.length > 1) {
			OwnerListCommonMarriage.push(
					{
						id   :  idSpouse2,
						name : "Acquis par " + spouse2
					}
			)
		}
        const PropertyOwner = () => {
			return (
					<TextField
			          error    = {this.state.isErrorPropertyOwner}
					  id       = "outlined-select-currency-native"
			          select
			          label    = "Acquis par"
			          onChange = {this.handleChange('propertyOwner')}
					  value    = {this.props.propertyOwner}
			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			        >
					   <option key="0" value = ""></option>
			          {OwnerListCommonMarriage.map(option => (
			            <option key={option.id} value={option.id}>
			              {option.name}
			            </option>
			          ))}
			        </TextField>
			)
        }
        const AcquirementTypeList = () => { 
			return (
					<TextField
			          error = {this.state.isErrorAcquirementType}
					  id="outlined-select-currency-native"
			          select
			          label="Type d'acquisition"
			          onChange ={this.handleChange('acquirementTypeId')}
					  value = {this.props.acquirementTypeId}

			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			        >
					   <option key="0" value = ""></option>
			          {this.state.acquisitionTypeList.map(option => (
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
                    Qui a acquis ce bien ?
                </Typography>
                <Typography variant='caption'>
                    Ceci définiera, selon votre situation familiale, comment ce bien est partagé.
                </Typography>
                <div>
                    <PropertyOwner />
                </div>
                <div>    
                   {displayAcquirementType && <AcquirementTypeList /> }
		        </div>
            </div>
        )
    }


}
export default Step8;