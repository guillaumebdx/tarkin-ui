import TableFamily          from '../Table/TableFamily.js';
import Dialog               from '@material-ui/core/Dialog';
import MuiDialogTitle       from '@material-ui/core/DialogTitle';
import IconButton           from '@material-ui/core/IconButton';
import CloseIcon            from '@material-ui/icons/Close';
import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import MuiDialogContent     from '@material-ui/core/DialogContent';
import withMobileDialog     from '@material-ui/core/withMobileDialog';

class FamilyListDialog extends Component
{
	
	constructor(props)
	{
		super(props)
		this.state = {
				familyList : [],
		}
//		this.handleChange = this.handleChange.bind(this)
	}

	componentWillReceiveProps(nextProps)
	{
        if (nextProps.open) {
            fetch("http://tarkin.harari.io/api/user/" + this.props.userId + "/physical-persons")
            .then(response => response.json())
            .then(data => this.setState({ familyList: data })) ;
        }
		

	}
	handleClose = () => {
	    	this.props.callback();
	}
	
	render() {

		const DialogContent = withStyles(theme => ({
			  root: {
			    margin: 0,
			  },
			}))(MuiDialogContent);
		let id = 0;
		function createData(firstName, name, familyPosition) {
		  id += 1;
		  return { id, firstName, name, familyPosition };
		}
		const rows = [];
		this.state.familyList.map(family => {
			return rows.push(createData(family.first_name, family.name, family.family_position))
		})

		return (
				<Dialog 
				aria-labelledby="responsive-dialog-title"
				open     ={this.props.open} 
				onClose  ={this.handleClose}
		        onBlur   ={this.handleChange}
				key = "DialogFamily"
                maxWidth="xl"
				>
				<MuiDialogTitle disableTypography className="modalTitle">
				<span className="modalTitle">
					Famille
				</span>
				<span className="closeIcon">
					 <IconButton aria-label="Close" onClick={this.handleClose}>
			            <CloseIcon />
			        </IconButton>
		        </span>
				</MuiDialogTitle>
				 <DialogContent key="Content" className = "tarkinStyleContentDialog">
					<TableFamily rows={rows} />
				 </DialogContent>
				</Dialog>
						)
	}
	


}
export default withMobileDialog()(FamilyListDialog);