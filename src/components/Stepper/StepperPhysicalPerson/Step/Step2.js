import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';
import FormControlLabel     from '@material-ui/core/FormControlLabel';
import ThumbDownRounded     from '@material-ui/icons/ThumbDownRounded';
import ThumbUpRounded       from '@material-ui/icons/ThumbUpRounded';
import Radio                from '@material-ui/core/Radio';
import RadioGroup           from '@material-ui/core/RadioGroup';

class Step2 extends Component
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
                    Avez vous un ou des enfants ?
                </Typography>
                <Typography variant='caption'>
                    Adopté ou non.
                </Typography>
                <div className="propertiesIcons">
				<RadioGroup
		          aria-label= "question2"
		          name      = "question2"
		          value     = {this.props.question2}
		          onChange  = {this.handleChange('question2')}
		          row
		        >
                    <FormControlLabel
                    control={
                        <Radio checked={this.props.question2 === "1" ? true : false} icon={<ThumbUpRounded />} checkedIcon={<ThumbUpRounded fontSize="large" />} value={1}  />
                    }
                    />
                    <FormControlLabel
                    control={
                        <Radio checked={this.props.question2 === "0" ? true : false} icon={<ThumbDownRounded />} checkedIcon={<ThumbDownRounded fontSize="large" />} value={0} />
                    }
                    />
		        </RadioGroup>
				</div>
            </div>
        )
    }


}
export default Step2;