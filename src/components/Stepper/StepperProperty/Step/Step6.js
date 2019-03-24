import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';
import FormControlLabel     from '@material-ui/core/FormControlLabel';
import Home                 from '@material-ui/icons/Home';
import EuroSymbol           from '@material-ui/icons/EuroSymbol';
import Radio                from '@material-ui/core/Radio';
import RadioGroup           from '@material-ui/core/RadioGroup';

class Step6 extends Component
{


    constructor(props)
	{
		super(props)
		this.state = {
                isErrorType  : false,
                propertyType : '',
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
        return (
            <div className="center">
                <Typography variant='title'>
                    {this.props.name} est-il de l'immobilier ou du financier ?
                </Typography>
                <Typography variant='caption'>
                Sélectionnez le type de bien
                </Typography>
                <div className="propertiesIcons">
				<RadioGroup
		          aria-label="position"
		          name="position"
		          value={this.props.propertyType}
		          onChange={this.handleChange('propertyType')}
		          row
		        >
                    <FormControlLabel
                    control={
                        <Radio checked={this.props.propertyType === "checkedRealEstate" ? true : false} icon={<Home />} checkedIcon={<Home fontSize="large" />} value="checkedRealEstate"  />
                    }
                    />
                    <FormControlLabel
                    control={
                        <Radio checked={this.props.propertyType === "checkedFinancial" ? true : false} icon={<EuroSymbol />} checkedIcon={<EuroSymbol fontSize="large" />} value="checkedFinancial" />
                    }
                    />
		        </RadioGroup>
				</div>
            </div>
        )
    }


}
export default Step6;