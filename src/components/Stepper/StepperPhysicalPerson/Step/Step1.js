import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';
import FormControlLabel     from '@material-ui/core/FormControlLabel';
import ThumbDownRounded     from '@material-ui/icons/ThumbDownRounded';
import ThumbUpRounded       from '@material-ui/icons/ThumbUpRounded';
import Radio                from '@material-ui/core/Radio';
import RadioGroup           from '@material-ui/core/RadioGroup';

class Step1 extends Component
{


    constructor(props)
	{
		super(props)
		this.state = {
                isErrorType  : false,
                
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
                    Avez vous un conjoint ?
                </Typography>
                <Typography variant='caption'>
                    Répondez oui si vous êtes marié, pacsé, ou en concubinage
                </Typography>
                <div className="propertiesIcons">
				<RadioGroup
		          aria-label= "question1"
		          name      = "question1"
		          value     = {this.props.question1}
		          onChange  = {this.handleChange('question1')}
		          row
		        >
                    <FormControlLabel
                    control={
                        <Radio checked={this.props.question1 === "1" ? true : false} icon={<ThumbUpRounded />} checkedIcon={<ThumbUpRounded fontSize="large" />} value={1}  />
                    }
                    />
                    <FormControlLabel
                    control={
                        <Radio checked={this.props.question1 === "0" ? true : false} icon={<ThumbDownRounded />} checkedIcon={<ThumbDownRounded fontSize="large" />} value={0} />
                    }
                    />
		        </RadioGroup>
				</div>
            </div>
        )
    }


}
export default Step1;