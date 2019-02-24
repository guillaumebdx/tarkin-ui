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

                this.props.data.heirs.map(item => 
                    Object.keys(item.taxes).forEach(e => 
                        console.log(`key=${e}  value=${item.taxes[e]}`)
                    )
                )
                
                //begin
                const Heirs = () => {
                const rows  = this.props.data.heirs.map((row, index) => {
                const taxes = Object.keys(row.taxes).map((tax) => {
                    return (
                    <div className="flex">
                        <p className="marginRight">{tax} %  </p>
                        <p>{row.taxes[tax]} €</p>
                    </div>
                    )
                })
                        return (
                            <div key={index}>
                                {row.firstName}
                                {taxes}
                            </div>   
                        );
                        
                    });
                 return <div>{rows}</div>;
                }

            
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
                        <Heirs />
                     </Paper>
				 </DialogContent>
			</Dialog>
        )
    }
}
export default withMobileDialog()(InheritExplanation);