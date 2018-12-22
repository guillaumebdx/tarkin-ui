import React, { Component } from 'react';
import Fab                  from '@material-ui/core/Fab';
import AddIcon              from '@material-ui/icons/Add';
import                           '../../styles/button.css';


class PlusButton extends Component {
	
	handleClick = (context) => {
	    console.log(context);
	  }

	render(props) {
		  return (
				    <div>
					    <Fab aria-label="Add" className={"plusButton materialButton"} onClick={() => this.handleClick(this.props.context)}>
						    <AddIcon />
					    </Fab>
				    </div>
				  );
	}

}
  


export default PlusButton;