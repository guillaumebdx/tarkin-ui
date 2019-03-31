import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
const dateFormat = require('dateformat');

const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
};

class ProgressMobileStepper extends React.Component {
  state = {
    activeStep        : 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    this.props.callbackStepNext();
  };

  handleSave = (e) => {
    this.props.callbackSave()
   };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
    this.props.callbackStepBack();
  };

  render() {
    const {classes, theme, nbSteps } = this.props;
    const { activeStep }             = this.state;
    let disabledArrow    = false;
    if (activeStep === 0 && this.props.name === '' ) {
        disabledArrow = true;
    }
    if (activeStep === 1 && this.props.amount === '') {
        disabledArrow = true;
    }
    if (activeStep === 2 && this.props.rate === '') {
        disabledArrow = true;
    }
    if (activeStep === 5 && this.props.propertyType === '') {
        disabledArrow = true;
    }
    if (activeStep === 6 && (this.props.financialId === '' && this.props.realEstateId === '')) {
        disabledArrow = true;
    }
    if (activeStep === 7 && (this.props.propertyOwner === '')) {
        disabledArrow = true;
    }
    return (
      <MobileStepper
        variant="progress"
        steps={nbSteps}
        position="static"
        activeStep={this.state.activeStep}
        className={classes.root}
        nextButton={
          <Button size="small" onClick={this.state.activeStep === 7 ? this.handleSave : this.handleNext} disabled={disabledArrow}>
          {this.state.activeStep === 7 ? "Sauvegarder" : "Suivant" }
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
      />
    );
  }
}

ProgressMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProgressMobileStepper);