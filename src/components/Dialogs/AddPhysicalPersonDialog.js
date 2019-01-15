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

class AddPhysicalPersonDialog extends Component
{
	
	constructor(props)
	{
		super(props)
		this.state = {
				name      :      "",
				firstName : "",
				spouses   : [],
		}
		this.handleChange = this.handleChange.bind(this)
	}
	shouldComponentUpdate(nextProps, nextState)
	{

		if (nextProps.open !== this.props.open) {
			return true;
		}
		if (nextState.selectedDate !== this.state.selectedDate) {
			return true;
		}
		if (nextState.familyPosition !== this.state.familyPosition) {
			return true;
		}
		if (nextState.childOf !== this.state.childOf) {
			return true;
		}
		if (nextState.isErrorName !== this.state.isErrorName) {
			return true;
		}
		return false;
	}
	componentDidMount()
	{
		fetch("http://tarkin.harari.io/api/family-positions")
		.then(response => response.json())
		.then(data => this.setState({ familyPositionList: data }));
	}

	componentWillReceiveProps(nextProps)
	{
	
		this.props.persons.map(person => {
			if (person.cradle === true) {
				this.setState({cradleName: person.name, cradleFirstName: person.first_name })
			}
			return null;
		})
		let spouses = [];
		this.props.persons.map(person => {
			if (person.family_position === 'Conjoint') {
				spouses.push(person);
			}
			return null;
		})
		if(spouses.length === 2) {
			this.setState({isSingle: false})
			this.setState({spouses:spouses})
		} else {
			this.setState({isSingle: true})
		}

	}
	
	handleClose = () => {
	    	this.props.callback();
	  }
	
	handleChange = (name) => event => {
		this.setState({
	        [name]: event.target.value,
	    });
	  };

	  plusClicked = (context) => {
		  if(context === "plusButton" ) {
			  
		  }
	 }
	  handleDateChange = date => {
		    this.setState({ selectedDate: date });
	};

	render() {
		
		const DialogContent = withStyles(theme => ({
			  root: {
			    margin: 0,
			    padding: theme.spacing.unit * 2,
			  },
			}))(MuiDialogContent);
		let spouse1 = '';
		let spouse2 = '';
		let idSpouse1 = '';
		let idSpouse2 = '';

		if (this.state.spouses.length > 0) {
			spouse1 = this.state.spouses[0].first_name
			idSpouse1 = this.state.spouses[0].id
			spouse2 = this.state.spouses[1].first_name
			idSpouse2 = this.state.spouses[1].id
		}
		const OwnerListCommonMarriage = [
			{
				id   : idSpouse1,
				name : "Enfant de " + spouse1 
			},
			{
				id   :  idSpouse2,
				name : "Enfant de " + spouse2
			}
		]
		
		const ChildOf = () => {
			return (
					<TextField
			          error    = {this.state.isErrorChildOf}
					  id       = "outlined-select-currency-native"
			          select
			          label    = "Lié à "
			          onChange = {this.handleChange('childOf')}
					  value    = {this.state.childOf}
					  fullWidth
			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			        >
					   <option key="0" value = "Couple">Couple</option>
			          {OwnerListCommonMarriage.map(option => (
			            <option key={option.id} value={option.id}>
			              {option.name}
			            </option>
			          ))}
			        </TextField>
			)
		}
		
		const PhysicalPersonList = () => { 
			return (
					<TextField
					  error = {this.state.isErrorFamilyPosition}
					  id="outlined-select-currency-native"
			          select
			          label={"Lien familial"}
			          onChange ={this.handleChange('familyPosition')}
					  value = {this.state.familyPosition}

			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			          fullWidth
			        >
					   <option key="0" value = ""></option>
			          {this.state.familyPositionList.map(option => (
			            <option key={option.id} value={option.identifier}>
			              {option.name}
			            </option>
			          ))}
			        </TextField>
			);
		}

		return (
				<Dialog 
				aria-labelledby="responsive-dialog-title"
				open     ={this.props.open} 
				onClose  ={this.handleClose}
		        onBlur   ={this.handleChange}
				key = "DialogAddPhysicalPerson"
				>
				<MuiDialogTitle disableTypography className="modalTitle">
				<span className="modalTitle">
					Ajouter une personne
				</span>
				<span className="closeIcon">
					 <IconButton aria-label="Close" onClick={this.handleClose}>
			            <CloseIcon />
			        </IconButton>
		        </span>
				</MuiDialogTitle>
				 <DialogContent key="Content">
				 <form noValidate autoComplete="off" key="FormAddPhysicalPerson">
				 <div>
				 	<PhysicalPersonList />
				 </div>
				 <div>
				 	{!this.state.isSingle && <ChildOf /> }
				 </div>
				 <div>
				<TextField 
					error        = {this.state.isErrorName}
				    id           = "PhysicalPersonName"
			        label        = "Nom"
			        margin       = "normal"
			        variant      = "outlined"
			        defaultValue = {this.state.name}
				    onBlur       = {this.handleChange('name')}
				    key          = "physicalPersonName"
				    fullWidth				    	
				/>
		        </div>
		        <div>
				<TextField 
					error        = {this.state.isErrorFirstName}
				    id           = "PhysicalPersonFirstName"
			        label        = "Prénom"
			        margin       = "normal"
			        variant      = "outlined"
			        defaultValue = {this.state.firstName}
				    onBlur       = {this.handleChange('firstName')}
				    key          = "physicalPersonFirstName"
				    fullWidth				    	
				/>
		        </div>
				<div>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DatePicker 
					    fullWidth
						label       = "Date de naissance"
 					    variant     = "outlined"
						margin      ="normal"
			            value       = {this.state.selectedDate}
					    onChange    = {this.handleDateChange} />
				</MuiPickersUtilsProvider>
				</div>
				</form>
			    </DialogContent>
			    </Dialog>
		)
	}
	


}
export default withMobileDialog()(AddPhysicalPersonDialog);
