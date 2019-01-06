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

class AddPropertyDialog extends Component
{
	
	constructor(props)
	{
		super(props)
		this.state = {
				propertyData : new Map(),
				name         : '',
				amount       : null,
				rate         : null, 
				isFinancial  : null,
				propertyType : '',
		}
	}

	handleClose = () => {
	    	this.props.callback();
	  }

	handleChange = name => event => {
	    this.setState({
	        [name]: event.target.value,
	    });
	  };

	  handleChangeIsFinancial = event => {
		    this.setState({ propertyType: event.target.value });
		    if (event.target.value === "checkedFinancial") {
		    	this.setState({isFinancial : true});
		    } else {
		    	this.setState({isFinancial : false});
		    }
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
				open     ={this.props.open} 
				onClose  ={this.handleClose}
		        onBlur   ={this.handleChange}
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
				 <form noValidate autoComplete="off">
				 <div>
				<TextField 
				    id           = "PropertyName"
			        label        = "Nom du bien"
			        margin       = "normal"
			        variant      = "outlined"
			        defaultValue = {this.state.name}
				    onBlur       = {this.handleChange('name')}
				/>
		        </div>
				<div>
			    <TextField 
				    id      ="PropertyValue"
			        label   ="Valeur du bien"
			        margin  ="normal"
			        variant ="outlined"
			        type    ="number"
			        defaultValue = {this.state.amount}
				    onBlur       = {this.handleChange('amount')}
				/>
			    </div>
				<div>
				<TextField 
				    id           ="PropertyRate"
			        label        ="Rendement du bien"
			        margin       ="normal"
			        variant      ="outlined"
			        type         ="number"
			        defaultValue = {this.state.rate}
				    onBlur       = {this.handleChange('rate')}
			    />
				</div>
				<div className="propertiesIcons">
				<RadioGroup
		          aria-label="position"
		          name="position"
		          value={this.state.propertyType}
		          onChange={this.handleChangeIsFinancial}
		          row
		        >
				<FormControlLabel
		          control={
		            <Radio checked={this.state.propertyType === "checkedRealEstate" ? true : false} icon={<Home />} checkedIcon={<Home fontSize="large" />} value="checkedRealEstate"  />
		          }
		        />
	        	<FormControlLabel
		        control={
		            <Radio checked={this.state.propertyType === "checkedFinancial" ? true : false} icon={<EuroSymbol />} checkedIcon={<EuroSymbol fontSize="large" />} value="checkedFinancial" />
		        }
		        />
		        </RadioGroup>
				</div>
				</form>
			    </DialogContent>
			    </Dialog>
		)
	}
	


}
export default withMobileDialog()(AddPropertyDialog);