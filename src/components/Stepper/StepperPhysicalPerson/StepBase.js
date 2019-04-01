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
      'Lien familial', 
      '?',
     
    ],
    question1       : "",
    question2       : "",
    name            : "",
    firstName       : "",
    familyPosition  : "",
    spouses         : [],
    spouseLaw       : "",
    childOf         : "",
    relatedTo       : "",
    selectedDate    : new Date(),

  };

    getStepContent = (stepIndex) => {
    switch (stepIndex) {
        case 0:
        return <Step1 
                    callback  = {this.callbackSave.bind(this)} 
                    question1 = {this.state.question1}
                /> ;
        case 1:
        return this.state.question1 === "0" ? <Step2
                    callback  = {this.callbackSave.bind(this)} 
                    question2 = {this.state.question2}
                /> : "formulaire conjoint" ;
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
      if (key === "question1" && value === "1") {
        this.replaceStep("Votre conjoint", 1)
      }
      if (key === "question1" && value === "0") {
        this.replaceStep("Enfants ?", 1)
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
    if (activeStep === 0 && this.state.question1 === '' ) {
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
         />
         } 
        <div className = "stepContainer">
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>Cette personne est bien ajoutée !</Typography>
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
                <Button variant="contained" color="primary" onClick={activeStep === 27 ? this.handleSave : this.handleNext} className={"plusButton"} disabled = {disabledArrow} >
                  {activeStep === 27 ? <SaveIcon /> : <NextIcon />}
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