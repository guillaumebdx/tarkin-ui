import Dialog               from '@material-ui/core/Dialog';
import MuiDialogTitle       from '@material-ui/core/DialogTitle';
import IconButton           from '@material-ui/core/IconButton';
import CloseIcon            from '@material-ui/icons/Close';
import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import MuiDialogContent     from '@material-ui/core/DialogContent';
import withMobileDialog     from '@material-ui/core/withMobileDialog';
import Paper from '@material-ui/core/Paper';

class InheritExplanation extends Component
{
    handleClose = () => {
	    	this.props.callback();
	}
    render() {
        const DialogContent = withStyles(theme => ({
			  root: {
			    margin: 0,
			  },
			}))(MuiDialogContent);
        return(
            <Dialog 
				aria-labelledby="responsive-dialog-title"
				open     ={this.props.open} 
				onClose  ={this.handleClose}
		        onBlur   ={this.handleChange}
				key = "InheritExplanation"
                maxWidth="xl"
                fullWidth
				>
				<MuiDialogTitle disableTypography className="modalTitle">
				<span className="modalTitle">
					Explications
				</span>
				<span className="closeIcon">
					 <IconButton aria-label="Close" onClick={this.handleClose}>
			            <CloseIcon />
			        </IconButton>
		        </span>
				</MuiDialogTitle>
				 <DialogContent key="Content" className = "tarkinStyleContentDialog">
				     <Paper>
                         Texte
                     </Paper>
				 </DialogContent>
			</Dialog>
        )
    }
}
export default withMobileDialog()(InheritExplanation);