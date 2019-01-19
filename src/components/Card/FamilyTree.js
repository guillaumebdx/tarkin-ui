import React, { Component } from 'react';
import Icon                 from '@material-ui/core/Icon';

class FamilyTree extends Component 
{
	
	render() {
		let physicalPersonsData = this.props.personsData
		let commonChildren      = [];
		let cradleChildren      = [];
		let spouseChildren      = [];
		let cradle              = [];
		let spouse              = [];
		let spouseId            = "";
		let cradleId            = "";
		physicalPersonsData.forEach(function(element) {
			  if(element.family_position === 'Conjoint' && element.cradle === false) {
				  spouse.push(element)
				  spouseId = element.id
			  }
			  if(element.cradle === true) {
				  cradle.push(element)
				  cradleId = element.id
			  }
			  if(element.family_position === 'Enfant' && element.parents.length > 1 ) {
				  commonChildren.push(element)
			  }
		});
		
		physicalPersonsData.forEach(function(element) {
			if (element.family_position === 'Enfant' && element.parents.length === 1) {
				element.parents.forEach(function(parentId) {
					if (cradleId === parentId ) {
						cradleChildren.push(element)
					}
					if (spouseId === parentId) {
						spouseChildren.push(element)
					}
				})	
			}
			
		});
		
		
		
		
		
		const PhysicalPersons = () => {
		
			const commonChildrenData = commonChildren.map((item, index) => 
			<li  key={index}>
				<div className="treeHover"><Icon fontSize="large">person_pin</Icon></div>
				<div className="treeName white">{item.first_name}</div>
			</li>
			
		);
			const cradleChildrenData = cradleChildren.map((item, index) => 
			<li  key={index}>
				<div className="treeHover"><Icon fontSize="large">person_pin</Icon></div>
				<div className="treeName white">{item.first_name}</div>
			</li>
			
		);
			const spouseChildrenData = spouseChildren.map((item, index) => 
			<li  key={index}>
				<div className="treeHover"><Icon fontSize="large">person_pin</Icon></div>
				<div className="treeName white">{item.first_name}</div>
			</li>
			
		);
			const cradleData = cradle.map((item, index) => 
			<li  key={index}>
				<div className="treeHover"><Icon fontSize="large">person_pin</Icon></div>
				<div className="treeName white">{item.first_name}</div>
				{cradleChildren.length > 0 && <ul>{cradleChildrenData}</ul>}
			</li>
			
		);
			const spouseData = spouse.map((item, index) => 
			<li  key={index}>
				<div className="treeHover"><Icon fontSize="large">person_pin</Icon></div>
				<div className="treeName white">{item.first_name}</div>
				{spouseChildren.length > 0 && <ul>{spouseChildrenData}</ul>}
			</li>
			
		);
			 return (
					 <div className="tree familyTree">
						 <ul>
						 	 {cradleData}
						     <li>
						         <ul>
						 	        {commonChildrenData}
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