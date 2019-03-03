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
import Currency from 'react-currency-formatter';

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
                <p><Currency quantity={row.taxes[tax]}  group=" "  currency="EUR" /></p>
            </div>
            )
        })
        const HeirList = () => {
            return (
            <ul className="heirList">
                    <li className="flex spaceBetween">
                        <span>Part ({row.propertyType}) :</span> <span><Currency pattern= "##,### !" quantity={row.amount} group=" "  currency="EUR" /></span>
                    </li>
                    <li className="flex spaceBetween">
                        <span>Abattement ({row.familyPosition}) :</span> <span><Currency pattern= "##,### !" quantity={row.allowance} group=" "  currency="EUR" /></span>
                    </li>
                    <li className="flex spaceBetween">
                        <span>Part taxable : </span> <span><Currency pattern= "##,### !" quantity={row.taxablePart} group=" "  currency="EUR" /></span>
                    </li>
                    <li className="marginBottom marginTop">
                        Application du barème progressif sur la part taxable :
                        <div className="scalesBlock">
                            {taxes}
                        </div>
                    </li>
                    <li className="flex spaceBetween">
                        <span>Droits de successions :</span> <span><Currency pattern= "##,### !" quantity={row.tax} group=" "  currency="EUR" /></span>
                    </li>
                    <li className="flex spaceBetween">
                        <span>Montant net :</span> <span><Currency pattern= "##,### !" quantity={row.netSum} group=" "  currency="EUR" /></span>
                    </li>
                </ul>
            )
        }
        const NoTax = () => {
            return (
                <div>
                    <span>
                        Aucun droit de succession à payer.
                    </span>
                    <div className="flex spaceBetween">
                        <span>Montant net :</span> <span><Currency pattern= "##,### !" quantity={row.netSum} group=" "  currency="EUR" /></span>
                    </div>
                </div>
            )
        }
                return (
                    <div key={index}>
                    <Paper className="heirBlock marginBottom">
                        <div className="flex heirBlockName">
                            <span>
                                {row.familyPositionIdentifier === "child" ? <Icon style={{ fontSize: 30 }}>child_care</Icon> : <Icon style={{ fontSize: 30 }}>person_pin</Icon>}
                            </span>
                            <span className="heirName">
                                {row.firstName}
                            </span>
                        </div>
                        {row.tax > 0 ? <HeirList /> : <NoTax />}
                     </Paper>
                   </div>   
                );
                
            });
            return (
                <div>
                    { this.props.data.heirs && rows}
                </div>
            )
        }

        const Beneficiaries = () => {
        const rows  = this.props.data.beneficiaries.map((row, index) => {
        const taxes = Object.keys(row.taxes).map((tax) => {
            return (
            <div className="flex spaceBetween">
                <p className="marginRight">{tax} %  </p>
                <p><Currency quantity={row.taxes[tax]}  group=" "  currency="EUR" /></p>
            </div>
            )
        })
        const HeirList = () => {
            return (
            <ul className="heirList">
                    <li className="flex spaceBetween">
                        <span>Part ({row.propertyType}) :</span> <span><Currency pattern= "##,### !" quantity={row.amount} group=" "  currency="EUR" /></span>
                    </li>
                    <li className="marginBottom marginTop">
                        Application du barème progressif assurance vie :
                        <div className="scalesBlock">
                            {taxes}
                        </div>
                    </li>
                    <li className="flex spaceBetween">
                        <span>Impôt assurance vie:</span> <span><Currency pattern= "##,### !" quantity={row.tax} group=" "  currency="EUR" /></span>
                    </li>
                    <li className="flex spaceBetween">
                        <span>Montant net :</span> <span><Currency pattern= "##,### !" quantity={row.netSum} group=" "  currency="EUR" /></span>
                    </li>
                </ul>
            )
        }
        const NoTax = () => {
            return (
                <div>
                    <span>
                        Aucun impôt sur l'assurance vie
                    </span>
                    <div className="flex spaceBetween">
                        <span>Montant net :</span> <span><Currency pattern= "##,### !" quantity={row.netSum} group=" "  currency="EUR" /></span>
                    </div>
                </div>
            )
        }
                return (
                    <div key={index}>
                    <Paper className="heirBlock marginBottom">
                        <div className="flex heirBlockName">
                            <span>
                                {row.familyPositionIdentifier === "child" ? <Icon style={{ fontSize: 30 }}>child_care</Icon> : <Icon style={{ fontSize: 30 }}>person_pin</Icon>}
                            </span>
                            <span className="heirName">
                                {row.firstName}
                            </span>
                        </div>
                        {row.tax > 0 ? <HeirList /> : <NoTax />}
                     </Paper>
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
                        <Heirs />
                        {this.props.data.beneficiaries && <Beneficiaries /> }
				 </DialogContent>
			</Dialog>
        )
    }
}
export default withMobileDialog()(InheritExplanation);