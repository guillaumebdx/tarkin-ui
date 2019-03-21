
import React, { Component }        from 'react';
import Typography                  from '@material-ui/core/Typography';
import MomentUtils                 from "@date-io/moment";
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker }              from 'material-ui-pickers';
import moment                      from 'moment';
import "moment/locale/fr";
MomentUtils.prototype.getStartOfMonth=MomentUtils.prototype.startOfMonth

class Step4 extends Component
{

    constructor(props)
	{
		super(props)
		this.state = {
                isErrorValue : false,
		}
		this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (name) => event => {
        this.setState({
	        [name]: event,
        });
        let stepData = new Map();
        stepData.set(name, event);
        this.props.callback(stepData);
        
	  };

    render()
    {
        return (
            <div className="center">
                <Typography variant='title'>
                    A quelle date avez vous acquis {this.props.name} ?
                </Typography>
                <Typography variant='caption'>
                    Si vous vous en souvenez ! sinon essayez au moins de mettre l'année
                </Typography>
			    <div>
				<MuiPickersUtilsProvider utils={MomentUtils} locale='fr' moment={moment}>
                    <DatePicker 
                        label       = "Date d'achat"
 					    variant     = "outlined"
						margin      ="normal"
                        value       = {this.props.selectedDate}
					    onChange    = {this.handleChange('selectedDate')} 
                    />
				</MuiPickersUtilsProvider>
			    </div>
            </div>
        )
    }


}
export default Step4;