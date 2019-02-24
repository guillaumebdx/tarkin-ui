import Dialog               from '@material-ui/core/Dialog';
import MuiDialogTitle       from '@material-ui/core/DialogTitle';
import IconButton           from '@material-ui/core/IconButton';
import CloseIcon            from '@material-ui/icons/Close';
import React, { Component, Children } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import MuiDialogContent     from '@material-ui/core/DialogContent';
import withMobileDialog     from '@material-ui/core/withMobileDialog';
import Icon                 from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import { ro } from 'date-fns/esm/locale';

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

        const Heirs = () => {
        const rows  = this.props.data.heirs.map((row, index) => {
        const taxes = Object.keys(row.taxes).map((tax) => {
            return (
            <div className="flex spaceBetween">
                <p className="marginRight">{tax} %  </p>
                <p>{row.taxes[tax]} €</p>
            </div>
            )
        })
                return (
                    <div key={index} className="heirBlock">
                        <div className="flex heirBlockName">
                            <span>
                                {row.familyPositionIdentifier === "child" ? <Icon>child_care</Icon> : <Icon>person_pin</Icon>}
                            </span>
                            <span className="heirName">
                                {row.firstName}
                            </span>
                        </div>
                        <ul className="heirList">
                            <li className="flex spaceBetween">
                                <span>Part ({row.propertyType}) :</span> <span>{row.amount} €</span>
                            </li>
                            <li className="flex spaceBetween">
                                <span>Abattement ({row.familyPosition}) :</span> <span>{row.allowance} €</span>
                            </li>
                            <li className="flex spaceBetween">
                                <span>Part taxable : </span> <span>{row.taxablePart} €</span>
                            </li>
                            <li>
                                Application du barème progressif sur la part taxable :
                                <div className="scalesBlock">
                                    {taxes}
                                </div>
                            </li>
                            <li className="flex spaceBetween">
                                <span>Droits de successions :</span> <span>{row.tax} €</span>
                            </li>
                            <li className="flex spaceBetween">
                                <span>Montant net :</span> <span>{row.netSum} €</span>
                            </li>
                        </ul>
                        
                        
                       
                    </div>   
                );
                
            });
            return (
                <div>
                    { this.props.data.heirs && rows}
                </div>
            )
        }

            
        return(
            <Dialog 
				aria-labelledby="responsive-dialog-title"
				open     ={this.props.open} 
				onClose  ={this.handleClose}
		        onBlur   ={this.handleChange}
				key = "InheritExplanation"
                maxWidth="xl"
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