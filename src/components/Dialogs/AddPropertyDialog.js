import Dialog               from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from 'react';
import TextField            	from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';


class AddPropertyDialog extends Component
{
	
	handleClose = () => {
	    	this.props.callback();
	  }
	
	render() {
		const DialogContent = withStyles(theme => ({
			  root: {
			    margin: 0,
			    padding: theme.spacing.unit * 2,
			  },
			}))(MuiDialogContent);
		

		return (
				<Dialog 
				aria-labelledby="responsive-dialog-title"
				open={this.props.open} 
				onClose={this.handleClose}
				>
				<MuiDialogTitle disableTypography>
				<span className="modalTitle">
					Ajouter une propriété
				</span>
				<span className="closeIcon">
					 <IconButton aria-label="Close" onClick={this.handleClose}>
			            <CloseIcon />
			        </IconButton>
		        </span>
				</MuiDialogTitle>
				 <DialogContent>
				<TextField 
				    id      ="PropertyName"
			        label   ="Nom du bien"
			        margin  ="normal"
			        variant ="outlined"
				/>
			    </DialogContent>
			    </Dialog>
		)
	}
	


}
export default withMobileDialog()(AddPropertyDialog);