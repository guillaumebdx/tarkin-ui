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

class PropertyListDialog extends Component
{
	
	constructor(props)
	{
		super(props)
		this.state = {
				propertyList : [],
		}
//		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount()
	{
		fetch("http://tarkin.harari.io/api/user/" + this.props.userId + "/properties")
		.then(response => response.json())
		.then(data => this.setState({ propertyList: data })) ;

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
		let id = 0;
		function createData(name, type, owner, value, rate) {
		  id += 1;
		  return { id, name, type, owner, value, rate };
		}
		const rows = [];
		this.state.propertyList.map(property => {
			rows.push(createData(property.name, property.type, property.physicalPersonFirstName, property.value, property.returnRate))
		})

		return (
				<Dialog 
				aria-labelledby="responsive-dialog-title"
				open     ={this.props.open} 
				onClose  ={this.handleClose}
		        onBlur   ={this.handleChange}
				key = "DialogAddProperty"
				maxWidth="xl"
				>
				<MuiDialogTitle disableTypography className="modalTitle">
				<span className="modalTitle">
					Liste des biens
				</span>
				<span className="closeIcon">
					 <IconButton aria-label="Close" onClick={this.handleClose}>
			            <CloseIcon />
			        </IconButton>
		        </span>
				</MuiDialogTitle>
				 <DialogContent key="Content">
					<TableProperty rows={rows} />
				 </DialogContent>
				</Dialog>
						)
	}
	


}
export default withMobileDialog()(PropertyListDialog);