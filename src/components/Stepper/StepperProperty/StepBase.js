import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { withStyles }       from '@material-ui/core/styles';
import Stepper              from '@material-ui/core/Stepper';
import Step                 from '@material-ui/core/Step';
import StepLabel            from '@material-ui/core/StepLabel';
import Button               from '@material-ui/core/Button';
import Typography           from '@material-ui/core/Typography';
import Step1                from './Step/Step1'
import Step2                from './Step/Step2'
import Step3                from './Step/Step3'
import Step4                from './Step/Step4'
import Step5                from './Step/Step5'
import Step6                from './Step/Step6'
import Step7                from './Step/Step7'
import Step8                from './Step/Step8'
import NextIcon             from '@material-ui/icons/NavigateNext';
import BeforeIcon           from '@material-ui/icons/NavigateBefore';
import SaveIcon             from '@material-ui/icons/Save';
import ProgressMobileStepper from './ProgressMobileStepper'
const dateFormat = require('dateformat');

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const isMobile = window.innerWidth <= 500;


class StepBase extends Component {
  state = {

    activeStep: 0,
    stepNames : [
      'Nom du bien', 
      'Valeur du bien', 
      'Rendement du bien', 
      'Date d\'achat', 
      'Rapport sentimental', 
      'Type de bien',
      
    ],
    isRealEstate      : false,
    selectedDate      : new Date(),
    feelingValue      : 5,
    propertyType      : '',
    name              : '',
    amount            : '',
    rate              : '',
    propertyType      : '',
    financialId       : '',
    realEstateId      : '',
    propertyOwner     : '',
    acquirementTypeId : '',

  };

    getStepContent = (stepIndex) => {
    switch (stepIndex) {
        case 0:
        return <Step1 
                    value    = {this.state.name} 
                    callback = {this.callbackSave.bind(this)} 
                /> ;
        case 1:
        return <Step2 
                    amount   = {this.state.amount} 
                    callback = {this.callbackSave.bind(this)} 
                />;
        case 2:
        return <Step3 
                    rate     = {this.state.rate} 
                    name     = {this.state.name} 
                    callback = {this.callbackSave.bind(this)} 
                />;
        case 3:
        return <Step4 
                    selectedDate = {this.state.selectedDate} 
                    name         = {this.state.name} 
                    callback     = {this.callbackSave.bind(this)} 
                />;
        case 4:
        return <Step5 
                    feelingValue = {this.state.feelingValue} 
                    name         = {this.state.name} 
                    callback     = {this.callbackSave.bind(this)}   
                />;
        case 5:
        return <Step6 
                    propertyType = {this.state.propertyType} 
                    name         = {this.state.name} 
                    callback     = {this.callbackSave.bind(this)} 
                />;
        case 6:
        return <Step7 
                    financialId  = {this.state.financialId} 
                    realEstateId = {this.state.realEstateId} 
                    propertyType = {this.state.propertyType} 
                    callback     = {this.callbackSave.bind(this)}  
                />;
        case 7:
        return <Step8
                persons       = {this.props.persons}
                callback      = {this.callbackSave.bind(this)}  
                propertyOwner = {this.state.propertyOwner}
                acquirementTypeId = {this.state.acquirementTypeId}
                />
        default:
        return '';
    }
  }

  handleNext = (e) => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleSave = (e) => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    if (this.state.acquirementTypeId === "0" || typeof this.state.acquirementTypeId === "undefined") {
        let lawPosition = "";
        this.props.persons.forEach(function(value) {
            if (value.cradle === true) {
                lawPosition = value.law_position;
            }
        })
        if (lawPosition === "common-community") {
            return this.setState({isErrorAcquirementType: true})
        }
        
    }
    let propertyType = '';
    if (this.state.propertyType === "checkedFinancial") {
        propertyType = this.state.financialId;
    } else {
        propertyType = this.state.realEstateId;
    }
    let propertyOwner = this.state.propertyOwner
    if(this.state.propertyOwner === "0" || typeof this.state.propertyOwner === "undefined") {
        this.props.persons.forEach(function (value) {
            if (value.cradle === true) {
                propertyOwner = value.id;
            }
        })
    }

    let AddPropertyData = 
        {
            personId          : propertyOwner,
            name              : this.state.name,
            value             : this.state.amount,
            returnRate        : this.state.rate === null ? 0 : this.state.rate,
            propertyTypeId    : propertyType,
            acquirementTypeId : this.state.acquirementTypeId,
            acquirementDate   : dateFormat(this.state.selectedDate, "isoDateTime"),
            feelingValue      : this.state.feelingValue,
            
        }
    const request = async () => {
        await fetch('http://tarkin.harari.io/api/new-property', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(AddPropertyData)
        });
        this.props.callbackSave()
    };
    request();
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };
  callbackSave = (stepData) => {
       
      stepData.forEach(function(value, key) {
        this.setState({
                [key] : value,
            });
      if (key === "propertyType" && value === "checkedRealEstate") {
        this.replaceStep("Bien immobilier", 6)
      }
      if (key === "propertyType" && value === "checkedFinancial") {
          this.replaceStep("Bien financier", 6)
      }
      if (key === 'financialId' || key === "realEstateId") {
            this.replaceStep("Acquis par", 7);
      }
      }.bind(this));
  }

    replaceStep(e, index) {
        var array = [...this.state.stepNames];
        array.splice(index, 1, e);
        this.setState({stepNames: array});
    }

  render() {
    const { classes }    = this.props;
    const steps          = this.state.stepNames;
    const { activeStep } = this.state;
    let disabledArrow    = false;
    if (activeStep === 0 && this.state.name === '' ) {
        disabledArrow = true;
    }
    if (activeStep === 1 && this.state.amount === '') {
        disabledArrow = true;
    }
    if (activeStep === 2 && this.state.rate === '') {
        disabledArrow = true;
    }
    if (activeStep === 5 && this.state.propertyType === '') {
        disabledArrow = true;
    }
    if (activeStep === 6 && (this.state.financialId === '' && this.state.realEstateId === '')) {
        disabledArrow = true;
    }
    if (activeStep === 7 && (this.state.propertyOwner === '')) {
        disabledArrow = true;
    }

    return (
      <div className={classes.root}>
        {!isMobile &&
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key = {label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>}
         {isMobile && 
         <ProgressMobileStepper 
            callbackStepNext = {this.handleNext.bind(this)} 
            callbackStepBack = {this.handleBack.bind(this)}
            callbackSave     = {this.handleSave.bind(this)} 
            nbSteps          = {this.state.stepNames.length}
            name             = {this.state.name}
            amount           = {this.state.amount}
            rate             = {this.state.rate}
            propertyType     = {this.state.propertyType}
            financialId      = {this.state.financialId}
            realEstateId     = {this.state.realEstateId}
            propertyOwner    = {this.state.propertyOwner}
            persons          = {this.props.persons}

         />
         } 
        <div className = "stepContainer">
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>Votre bien est enregistré !</Typography>
            </div>
          ) : (
            <div>
              {this.getStepContent(activeStep)}
             {!isMobile &&
              <div className="flex spaceAround">
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={"deleteButton"}
                >
                  <BeforeIcon />
                </Button>
                <Button variant="contained" color="primary" onClick={activeStep === 7 ? this.handleSave : this.handleNext} className={"plusButton"} disabled = {disabledArrow} >
                  {activeStep === 7 ? <SaveIcon /> : <NextIcon />}
                </Button>
              </div>
             }
            </div>
          )}
        </div>
      </div>
    );
  }
}

StepBase.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(StepBase);