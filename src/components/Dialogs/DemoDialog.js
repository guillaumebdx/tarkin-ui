import Dialog               from '@material-ui/core/Dialog';
import MuiDialogTitle       from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import MuiDialogContent     from '@material-ui/core/DialogContent';
import withMobileDialog     from '@material-ui/core/withMobileDialog';

class DemoDialog extends Component
{
	
	constructor(props)
	{
		super(props)
		this.state = {
		users : [],
		}
//		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount()
	{
		fetch("http://tarkin.harari.io/api/users")
		.then(response => response.json())
		.then(data => this.setState({ users: data })) ;

	}
	handleClose = () => {
	    	this.props.callback();
	}
	
	render() {

		const DialogContent = withStyles(theme => ({
			  root: {
			    margin: 0,
			    padding: theme.spacing.unit ,
			  },
			}))(MuiDialogContent);
		const rows = [];
		this.state.users.map(user => {
			return rows.push(user.id)
		})
		const Users = () => {
		const rows  = this.state.users.map((row, index) => {
		const hrefId  = "?user=" + row.id
    	        return (
    	        	<div key={index}>
  			    	
    			        <a href = {hrefId}>
        			    {row.name}
        			    </a>
    			    </div>   
    	        );
    	        
    	    });
		return <div>{rows}</div>;
		}

		return (
				<Dialog 
				aria-labelledby= "responsive-dialog-title"
				open           = {this.props.open} 
				key            = "DemoDialog"
				>
				<MuiDialogTitle disableTypography className="modalTitle">
				<span className="modalTitle">
					Choisir une démo
				</span>
				</MuiDialogTitle>
				 <DialogContent key="Content">
				 <Users />
				 </DialogContent>
				</Dialog>
						)
	}
	


}
export default withMobileDialog()(DemoDialog);