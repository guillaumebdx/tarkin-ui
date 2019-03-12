import Dialog               from '@material-ui/core/Dialog';
import IconButton           from '@material-ui/core/IconButton';
import CloseIcon            from '@material-ui/icons/Close';
import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import MuiDialogContent     from '@material-ui/core/DialogContent';
import Typography           from '@material-ui/core/Typography';
import Slide                from '@material-ui/core/Slide';
import AppBar               from '@material-ui/core/AppBar';
import Toolbar              from '@material-ui/core/Toolbar';
import StepBase             from './StepBase';



const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class StepperProperty extends Component
{

    handleClose = () => {
	    	this.props.callback();
	  }

    render() {
        const DialogContent = withStyles(theme => ({
			  root: {
			    margin: 0,
			    padding: theme.spacing.unit * 2,
			  },
		}))(MuiDialogContent);
        const { classes } = this.props;
        return (
            <Dialog
                fullScreen
                open={this.props.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar color="primary" className={classes.appBar}>
                        <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            Assistant de création de propriété
                        </Typography>
                        </Toolbar>
                </AppBar>
                <DialogContent key="Content">
                    <StepBase />
                </DialogContent>
            </Dialog>
        )
    }

    


}
export default withStyles(styles)(StepperProperty);