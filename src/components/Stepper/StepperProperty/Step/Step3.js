
import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';
import TextField            from '@material-ui/core/TextField';
import InputAdornment       from '@material-ui/core/InputAdornment';

class Step3 extends Component
{

    constructor(props)
	{
		super(props)
		this.state = {
                isErrorValue : false,
                rate         : null,
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
            <div className="center stepContent">
                <Typography variant='title'>
                    Quel est le rendement de {this.props.name} ?
                </Typography>
                <Typography variant='caption'>
                    Si vous le connaissez. Sinon, vous pouvez aussi laisser ce champ vide.
                </Typography>
                <div>
			    <TextField 
			    	error        = {this.state.isErrorValue}
			        name         = "addPropertyValue"
				    id           = "PropertyValue"
			        label        = "Rendement du bien"
			        margin       = "normal"
			        variant      = "outlined"
			        type         = "number"
			        defaultValue = {this.props.rate}
				    onBlur       = {this.handleChange('rate')}
                    key          = "propertyValue"
                    autoComplete = "off"
			        InputProps={{
			            endAdornment: <InputAdornment position="end">%</InputAdornment>,
			        }}
				/>
			    </div>
            </div>
        )
    }


}
export default Step3;