import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import '../../styles/button.css';

class EditButton extends Component {
	
	handleClick = (context) => {
	    console.log(context);
	  }

	render(props) {
		  return (
				    <div>
					    <Fab variant="extended" aria-label="Edit" className={"editButton materialButton"} onClick={() => this.handleClick(this.props.context)}>
					    	<Icon>edit_icon</Icon>
					    </Fab>
				    </div>
				  );
	}

}



export default EditButton;