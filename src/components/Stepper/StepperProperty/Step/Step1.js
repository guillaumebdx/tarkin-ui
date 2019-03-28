import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';
import TextField            from '@material-ui/core/TextField';

class Step1 extends Component
{


    constructor(props)
	{
		super(props)
		this.state = {
                isErrorName : false,
                name        : '',
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
                Donnez un nom à votre bien
                </Typography>
                <Typography variant='caption'>
                Le nom n'a pas grande importance, il vous servira pour reconnaître le bien dans les analyses et conseils.
                </Typography>
                <div>
				<TextField 
					error        = {this.state.isErrorName}
				    name         = "addPropertyName"
				    id           = "PropertyName"
			        label        = "Nom du bien"
			        margin       = "normal"
			        variant      = "outlined"
			        defaultValue = {this.props.value}
				    onBlur       = {this.handleChange('name')}
                    key          = "propertyName"
                    autoComplete = "off"
		    	
				/>
		        </div>
            </div>
        )
    }


}
export default Step1;