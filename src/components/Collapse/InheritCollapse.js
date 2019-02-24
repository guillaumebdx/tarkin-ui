import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InheritExplanation from '../Dialogs/InheritExplanation';
import CountUp from 'react-countup';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

class InheritCollapse extends Component
{
    
    constructor()
    {
        super();
		this.state = {
                InheritExplanationIsOpen : false,
        }
        this.openInheritExplanation = this.openInheritExplanation.bind(this)

    }

    closeInheritExplanation() 
	{
		this.setState({InheritExplanationIsOpen : false})
    }
    
    openInheritExplanation() 
	{
        this.setState({InheritExplanationIsOpen : true})
    }
    render()
    {


        const Heirs = () => {
            return (
                <div>
                    
                    <Card className="backgroundPrimaryColor numberCard">
                    <CardHeader title="Nombre d'héritiers" className="numberHeader" />
                    <CardContent>
                        <CountUp 
                            className = "bigNumber"
                            start     = {0}
                            end       = {this.props.inheritData.heirs.length} 
                            useEasing = {true}                    
                        /> 
                    </CardContent>
                    </Card>

                    <Card className="backgroundPrimaryColor numberCard">
                    <CardHeader title="Montant total" className="numberHeader" />
                    <CardContent>
                        <CountUp 
                            className = "bigNumber"
                            start     = {0}
                            end       = {this.props.inheritData.totalAmount}   
                            separator = " "     
                            suffix    = " €"     
                            duration  = {1.5} 
                            useEasing = {true}         
                        /> 
                    </CardContent>
                    </Card>

                    <Card className="backgroundPrimaryColor numberCard">
                    <CardHeader title="Abattements" className="numberHeader" />
                    <CardContent>
                        <CountUp 
                            className = "bigNumber"
                            start     = {0}
                            end       = {this.props.inheritData.totalAllowance}   
                            separator = " "     
                            suffix    = " €"     
                            duration  = {1.5}         
                            useEasing = {true}               
                        /> 
                    </CardContent>
                    </Card>
                    <Card className="backgroundPrimaryColor numberCard">
                    <CardHeader title="Droits de successions" className="numberHeader" />
                    <CardContent>
                    <CountUp 
                        className = "bigNumber"
                        start     = {0}
                        end       = {this.props.inheritData.totalTax}      
                        separator = " "     
                        suffix    = " €"     
                        duration  = {1.5}    
                        useEasing = {true}                 
                        /> 
                    </CardContent>
                    </Card>
                    {/* {this.props.inheritData.heirs.map(item => 
                    <div className="marginBottom">
                        <div className="flex spaceBetween">
                            <p>Part revenant à {item.firstName} :</p> 
                            <p className="littlePadding">{item.amount} €</p>
                        </div>
                        <div className="flex spaceBetween">
                            <p>Abattement {item.familyPosition} :</p> 
                            <p className="littlePadding">{item.allowance} €</p>
                        </div>
                        <div className="flex spaceBetween">
                            <p>Part taxable</p> 
                            <p className="littlePadding">{item.taxablePart} €</p>
                        </div>
                        <div className="flex spaceBetween">
                            <p>Droits à payer</p> 
                            <p className="littlePadding">{item.tax} €</p>
                        </div>
                        <div className="flex spaceBetween">
                            <p>Part nette en {item.propertyType}</p> 
                            <p className="littlePadding">{item.netSum} €</p>
                        </div>
                    </div>
                    )} */}
                    <div className="center paddingTop">
                        <Button className="backgroundPrimaryColor" variant="contained" color="primary" onClick={this.openInheritExplanation}>
                        <Icon className="marginBottom backgroundPrimaryColor">highlight </Icon>
                        Explications
                        </Button>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <InheritExplanation
                    open         = {this.state.InheritExplanationIsOpen} 
                    callback     = {this.closeInheritExplanation.bind(this)}
                    data         = {this.props.inheritData}
                />
                   {this.props.inheritData.heirs !== undefined && <Heirs /> } 
            </div>
        )
    }
}
export default InheritCollapse;