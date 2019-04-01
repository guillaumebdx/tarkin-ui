import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({

  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class RecipeReviewCard extends React.Component {
	
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
		this.state = {
				anchorEl: null,
			    mobileMoreAnchorEl: null,
		}
	}
    handleProfileMenuOpen = event => {
	    this.setState({ anchorEl: event.currentTarget });
	  };

	  handleMenuClose = (e) => {
         if (e.currentTarget.dataset.id === "1" && e.currentTarget.dataset.context === "properties") {
            this.props.callback("modalAddProperties");
         }
         if (e.currentTarget.dataset.id === "2" && e.currentTarget.dataset.context === "properties") {
            this.props.callback("modalListProperties");
         }
         if (e.currentTarget.dataset.id === "3" && e.currentTarget.dataset.context === "properties") {
            this.props.callback("stepperProperty");
         }
         if (e.currentTarget.dataset.id === "1" && e.currentTarget.dataset.context === "physicalPerson") {
            this.props.callback("modalAddPhysicalPerson");
         }
         if (e.currentTarget.dataset.id === "2" && e.currentTarget.dataset.context === "physicalPerson") {
            this.props.callback("modalListfamily");
         }
         if (e.currentTarget.dataset.id === "3" && e.currentTarget.dataset.context === "physicalPerson") {
            this.props.callback("stepperPhysicalPerson");
         }
	     this.setState({ anchorEl: null });
	  };

	handleClick = (context) => {
	    if (context === "properties") {
	    	this.props.callback("modalAddProperties");
	    }
	    if (context === "physicalPerson") {
	    	this.props.callback("modalAddPhysicalPerson");
	    }
	  }
	handleClickList = (context) => {
	    if (context === "properties") {
	    	this.props.callback("modalListProperties");
	    }
	    if (context === "physicalPerson") {
	    	this.props.callback("modalListfamily");
	    }
	  }
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    
    const RenderMenu = () => {
    	
    	return (
    	      <Menu
    	        anchorEl={anchorEl}
    	        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    	        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    	        open={isMenuOpen}
    	        onClose={this.handleMenuClose}
    	      >
    	        {this.props.menu1 && <MenuItem onClick={this.handleMenuClose} data-id={1} data-context={this.props.context}>{this.props.menu1} </MenuItem>}
    	        {this.props.menu2 && <MenuItem onClick={this.handleMenuClose} data-id={2} data-context={this.props.context}>{this.props.menu2}</MenuItem>}
    	        {this.props.menu3 && <MenuItem onClick={this.handleMenuClose} data-id={3} data-context={this.props.context}>{this.props.menu3}</MenuItem>}
    	      </Menu>
    	      )
    }

    return (
      <Card className={"mainCard " + classes.card}>
        <CardHeader
          action={
            <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="inherit"
            >
            <span className="white"><MoreVertIcon /></span>
            </IconButton>
          }
          title={<span className="white">{this.props.title}</span>}
          subheader={<span className="white">{this.props.subHeader}</span>}
        />
        <CardContent>
	      <RenderMenu />
        {this.props.data}
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton onClick={() => this.handleClickList(this.props.context)}>
          <span className="white"><ListIcon /></span>
          </IconButton>
          <IconButton onClick={() => this.handleClick(this.props.context)}>
          <span className="white"><AddIcon /></span>
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Voir plus"
          >
          <span className="white"><ExpandMoreIcon /></span>
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <span className="white">{this.props.collapse}</span>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);