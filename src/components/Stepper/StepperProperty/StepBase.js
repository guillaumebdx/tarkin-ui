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
import MobileStepper        from '../MobileStepper'

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
      'Type de bien'
    ],
    isFinancial  : false,
    isRealEstate : false,

  };

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
        case 0:
        return <Step1 value={this.state.name} callback = {this.callbackSave.bind(this)} /> ;
        case 1:
        return <Step2 amount={this.state.amount} callback = {this.callbackSave.bind(this)} />;
        default:
        return '';
    }
  }

  handleNext = () => {
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
      }.bind(this));
  }


  render() {
    const { classes }    = this.props;
    const steps          = this.state.stepNames;
    const { activeStep } = this.state;

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
         <MobileStepper 
            callbackStepNext = {this.handleNext.bind(this)} 
            callbackStepBack = {this.handleBack.bind(this)} 
            nbSteps          = {this.state.stepNames.length}
         />
         } 
        <div>
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
                <Button variant="contained" color="primary" onClick={this.handleNext} className={"plusButton"}>
                  {activeStep === steps.length - 1 ? <SaveIcon /> : <NextIcon/>}
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