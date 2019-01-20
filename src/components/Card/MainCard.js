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
	}
	
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
	  }
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={"mainCard " + classes.card}>
        <CardHeader
          action={
            <IconButton>
            <span className="white"><MoreVertIcon /></span>
            </IconButton>
          }
          title=<span className="white">{this.props.title}</span>
          subheader=<span className="white">{this.props.subHeader}</span>
        />
        <CardContent>
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