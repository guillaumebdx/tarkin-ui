import React, { Component } from 'react';
import Icon                 from '@material-ui/core/Icon';

class FamilyTree extends Component 
{
	
	render() {
		let physicalPersonsData = this.props.personsData
		let children            = [];
		let cradle              = [];
		let spouse              = [];
		physicalPersonsData.forEach(function(element) {
			  if(element.family_position === 'Conjoint' && element.cradle === false) {
				  spouse.push(element)
			  }
			  if(element.cradle === true) {
				  cradle.push(element)
			  }
			});
		physicalPersonsData.forEach(function(element) {
			  if(element.family_position === 'Enfant') {
				  children.push(element)
			  }
			});
		
		const PhysicalPersons = () => {
			const childrenData = children.map((item, index) => 
			<li  key={index}>
				<div className="treeHover"><Icon fontSize="large">person_pin</Icon></div>
				<div className="treeName white">{item.first_name}</div>
			</li>
			
		);
			const cradleData = cradle.map((item, index) => 
			<li  key={index}>
				<div className="treeHover"><Icon fontSize="large">person_pin</Icon></div>
				<div className="treeName white">{item.first_name}</div>
			</li>
			
		);
			const spouseData = spouse.map((item, index) => 
			<li  key={index}>
				<div className="treeHover"><Icon fontSize="large">person_pin</Icon></div>
				<div className="treeName white">{item.first_name}</div>
			</li>
			
		);
			 return (
					 <div className="tree familyTree">
						 <ul>
						 	{cradleData}
						 <li>
						 <ul>
						 	{childrenData}
						 </ul>
						 </li>
						 	{spouseData}
						 </ul>
					 </div>

			 	
		 		    )
			 		
		}
		return (<PhysicalPersons />)
	}

}
export default FamilyTree;