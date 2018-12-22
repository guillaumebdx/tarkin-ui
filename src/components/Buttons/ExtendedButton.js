import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import '../../styles/button.css';


class ExtendedButton extends Component {
	
	handleClick = (context) => {
	    console.log(context);
	  }

	render(props) {
		  return (
				    <div>
					    <Fab variant="extended" aria-label="Delete" className={"extendedButton materialButton"} onClick={() => this.handleClick(this.props.context)}>
				            <Icon>{this.props.icon}</Icon>
						    {this.props.label}
					    </Fab>
				    </div>
				  );
	}

}


export default ExtendedButton;