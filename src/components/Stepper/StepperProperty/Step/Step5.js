import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';
import Slider               from '@material-ui/lab/Slider';

class Step5 extends Component
{

    constructor(props)
	{
		super(props)
		this.state = {
                isErrorValue : false,
                feelingValue : 5,
		}
		this.handleChange = this.handleChange.bind(this)
    }

      handleChange = (event, value) => {
        this.setState({ feelingValue: value });
        let stepData = new Map();
        stepData.set('feelingValue', value);
	    this.props.callback(stepData);
	};

    render()
    {
        return (
            <div className="center stepContent">
                <Typography variant='title'>
                    A quel point aimez vous {this.props.name} ?
                </Typography>
                <Typography variant='caption'>
                    Irrationnel ? pas tant que ça. <br />
                    Si vous détestez ce bien et que vous souhaitez vous en débarrasser, mettez 0 ! <br />
                    Si vous l'adorez et ne vous en sépareriez pour rien au monde, mettez 10 ! <br />
                    Si vous n'avez pas d'avis, laissez à 5.

                </Typography>
                <div>
                    <Slider
                        value           = {this.props.feelingValue}
                        aria-labelledby = "label"
                        onChange        = {this.handleChange}
                        className       = "sliderDialog"
                        min             = {0}
                        max             = {10}
                        step            = {1}
                    />	
			    </div>
                <Typography variant='title'>
                {this.props.feelingValue}
                </Typography>
            </div>
        )
    }


}
export default Step5;