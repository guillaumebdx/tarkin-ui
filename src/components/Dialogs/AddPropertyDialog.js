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
const dateFormat = require('dateformat');

class AddPropertyDialog extends Component
{
	
	constructor(props)
	{
		super(props)
		this.state = {
				realEstate        : new Map(),
				name              : '',
				amount            : null,
				rate              : null, 
				isFinancial       : null,
				financialList     : new Map(),
				propertyType      : '',
				propertyOwner     : '0',
				acquirementTypeId : '',
				spouses           : [],
				selectedDate      : new Date(),
		}
		this.handleChange = this.handleChange.bind(this)
	}
	componentDidMount()
	{
		fetch("http://tarkin.harari.io/api/properties/financial")
		.then(response => response.json())
		.then(data => this.setState({ financialList: data }));
		
		fetch("http://tarkin.harari.io/api/properties/realestate")
		.then(response => response.json())
		.then(data => this.setState({ realEstateList: data }));
		
		fetch("http://tarkin.harari.io/api/acquirement-types")
		.then(response => response.json())
		.then(data => this.setState({ acquisitionTypeList: data, acquirementTypeId: data[0].id }));
	
	}
	
	componentWillReceiveProps(nextProps)
	{
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
	  handleDateChange = date => {
		    this.setState({ selectedDate: date });
	};

	  handleChangeIsFinancial = event => {
		    this.setState({ propertyType: event.target.value });
		    if (event.target.value === "checkedFinancial") {
		    	this.setState({isFinancial : true});
		    } else {
		    	this.setState({isFinancial : false});
		    }
	  }
	  
	  save = (data) => {
		  
	  }
	  
	  plusClicked = (context) => {
		  if(context === "plusButton" ) {
			  let propertyType = '';
			  if (this.state.isFinancial) {
				  propertyType = this.state.financialId;
			  } else {
				  propertyType = this.state.realEstateId;
			  }

			 let AddPropertyData = 
				 {
					 personId          : this.state.propertyOwner,
					 name              : this.state.name,
					 value             : this.state.amount,
					 returnRate        : this.state.rate,
					 propertyTypeId    : propertyType,
					 acquirementTypeId : this.state.acquirementTypeId,
					 acquirementDate   : dateFormat(this.state.selectedDate, "isoDateTime"),
					 
				 }
				 
			 fetch('http://tarkin.harari.io/api/new-property', {
				  method: 'post',
				  headers: {
				    'Accept': 'application/json, text/plain, */*',
				    'Content-Type': 'application/json'
				  },
				  body: JSON.stringify(AddPropertyData)
				}).then(res=>res.json())
				  .then(res => console.log(res));
			  this.props.callbackSave();
			  }

		  }

	render() {
		const FinancialList = () => { 
			return (
					<TextField
			          id="outlined-select-currency-native"
			          select
			          label="Placement"
			          onChange ={this.handleChange('financialId')}
					  value = {this.state.financialId}
					  
			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			        >
			          {this.state.financialList.map(option => (
			            <option key={option.id} value={option.id}>
			              {option.name}
			            </option>
			          ))}
			        </TextField>
			);
		}
		const RealEstateList = () => { 
			return (
					<TextField
			          id="outlined-select-currency-native"
			          select
			          label="Bien immobilier"
			          onChange ={this.handleChange('realEstateId')}
					  value = {this.state.realEstateId}

			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			        >
			          {this.state.realEstateList.map(option => (
			            <option key={option.id} value={option.id}>
			              {option.name}
			            </option>
			          ))}
			        </TextField>
			);
		}
		
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
				id : 0,
				name : ''
			},
			{
				id   : idSpouse1,
				name : "Acquis par " + spouse1 
			},
			{
				id   :  idSpouse2,
				name : "Acquis par " + spouse2
			}
		]
		
		const PropertyOwner = () => {
			return (
					<TextField
			          id       = "outlined-select-currency-native"
			          select
			          label    = "Acquis par"
			          onChange = {this.handleChange('propertyOwner')}
					  value    = {this.state.propertyOwner}

			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			        >
			          {OwnerListCommonMarriage.map(option => (
			            <option key={option.id} value={option.id}>
			              {option.name}
			            </option>
			          ))}
			        </TextField>
			)
		}
		
		const AcquirementTypeList = () => { 
			return (
					<TextField
			          id="outlined-select-currency-native"
			          select
			          label="Type d'acquisition"
			          onChange ={this.handleChange('acquirementTypeId')}
					  value = {this.state.acquirementTypeId}

			          SelectProps={{
			            native: true,
			          }}
			          margin="normal"
			          variant="outlined"
			        >
			          {this.state.acquisitionTypeList.map(option => (
			            <option key={option.id} value={option.id}>
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
				key = "DialogAddProperty"
				>
				<MuiDialogTitle disableTypography>
				<span className="modalTitle">
					Ajouter un bien
				</span>
				<span className="closeIcon">
					 <IconButton aria-label="Close" onClick={this.handleClose}>
			            <CloseIcon />
			        </IconButton>
		        </span>
				</MuiDialogTitle>
				 <DialogContent key="Content">
				 <form noValidate autoComplete="off" key="FormAddProperty">
				 <div>
				<TextField 
				    id           = "PropertyName"
			        label        = "Nom du bien"
			        margin       = "normal"
			        variant      = "outlined"
			        defaultValue = {this.state.name}
				    onBlur       = {this.handleChange('name')}
				    key="propertyName"
				/>
		        </div>
				<div>
			    <TextField 
				    id      ="PropertyValue"
			        label   ="Valeur du bien"
			        margin  ="normal"
			        variant ="outlined"
			        type    ="number"
			        defaultValue   = {this.state.amount}
				    onBlur       = {this.handleChange('amount')}
			        key="propertyValue"
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
				    key="propertyRate"
			    />
				</div>
				<div>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DatePicker 
						label       = "Date d'achat"
 					    variant     = "outlined"
						margin      ="normal"
			            value       = {this.state.selectedDate}
					    onChange    = {this.handleDateChange} />
				</MuiPickersUtilsProvider>
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
				{this.state.propertyType === "checkedFinancial" && <FinancialList />}
				{this.state.propertyType === "checkedRealEstate" && <RealEstateList />}
				<div>
					{this.state.propertyType !== "" && <PropertyOwner /> }
				</div>
				<div>
					{this.state.propertyType !== ""  && <AcquirementTypeList /> }
				</div>
				<div className="propertiesIcons">
					{this.state.propertyType !== ""  && <PlusButton context="plusButton" callback = {this.plusClicked.bind(this)} /> }	
				</div>
				</form>
			    </DialogContent>
			    </Dialog>
		)
	}
	


}
export default withMobileDialog()(AddPropertyDialog);