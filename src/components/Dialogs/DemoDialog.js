import TableProperty        from '../Table/TableProperty.js';
import Dialog               from '@material-ui/core/Dialog';
import MuiDialogTitle       from '@material-ui/core/DialogTitle';
import IconButton           from '@material-ui/core/IconButton';
import CloseIcon            from '@material-ui/icons/Close';
import React, { Component } from 'react';
import TextField            from '@material-ui/core/TextField';
import { withStyles }       from '@material-ui/core/styles';
import MuiDialogContent     from '@material-ui/core/DialogContent';
import withMobileDialog     from '@material-ui/core/withMobileDialog';
import FormControlLabel     from '@material-ui/core/FormControlLabel';
import Home                 from '@material-ui/icons/Home';
import EuroSymbol           from '@material-ui/icons/EuroSymbol';
import Radio                from '@material-ui/core/Radio';
import RadioGroup           from '@material-ui/core/RadioGroup';
import PlusButton           from '../Buttons/PlusButton';
import DateFnsUtils                from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker }              from 'material-ui-pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
const dateFormat = require('dateformat');

class DemoDialog extends Component
{
	
	constructor(props)
	{
		super(props)
		this.state = {
		users : [],
		}
//		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount()
	{
		fetch("http://tarkin.harari.io/api/users")
		.then(response => response.json())
		.then(data => this.setState({ users: data })) ;

	}
	handleClose = () => {
	    	this.props.callback();
	}
	
	render() {

		const DialogContent = withStyles(theme => ({
			  root: {
			    margin: 0,
			    padding: theme.spacing.unit ,
			  },
			}))(MuiDialogContent);
		const rows = [];
		this.state.users.map(user => {
			rows.push(user.id)
		})
		const Users = () => {
		const rows  = this.state.users.map((row, index) => {
		const hrefId  = "?user=" + row.id
    	        return (
    	        	<div key={index}>
  			    	
    			        <a href = {hrefId}>
        			    {row.name}
        			    </a>
    			    </div>   
    	        );
    	        
    	    });
		return <div>{rows}</div>;
		}

		return (
				<Dialog 
				aria-labelledby="responsive-dialog-title"
				open     ={this.props.open} 
				key = "DemoDialog"
				>
				<MuiDialogTitle disableTypography className="modalTitle">
				<span className="modalTitle">
					Choisir une démo
				</span>
				</MuiDialogTitle>
				 <DialogContent key="Content">
				 <Users />
				 </DialogContent>
				</Dialog>
						)
	}
	


}
export default withMobileDialog()(DemoDialog);