
import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';
import TextField            from '@material-ui/core/TextField';
import InputAdornment       from '@material-ui/core/InputAdornment';

class Step2 extends Component
{

    constructor(props)
	{
		super(props)
		this.state = {
                isErrorValue : false,
                amount        : null,
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
                    A combien estimez-vous votre bien ?
                </Typography>
                <Typography variant='caption'>
                    Ici, la valeur estimée du bien à aujourd'hui.
                </Typography>
                <div>
			    <TextField 
			    	error        = {this.state.isErrorValue}
			        name         = "addPropertyValue"
				    id           = "PropertyValue"
			        label        = "Valeur du bien"
			        margin       = "normal"
			        variant      = "outlined"
			        type         = "number"
			        defaultValue = {this.props.amount}
				    onBlur       = {this.handleChange('amount')}
                    key          = "propertyValue"
                    autoComplete = "off"
			        InputProps={{
			            endAdornment: <InputAdornment position="end">€</InputAdornment>,
			        }}
				/>
			    </div>
            </div>
        )
    }


}
export default Step2;