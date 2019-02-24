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

        const Avert = () => {
            return <div>Utilisez l'assistant pour saisir les membres de votre famille</div>
        }
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
                   {this.props.inheritData.heirs !== undefined ? <Heirs /> : <Avert /> } 
            </div>
        )
    }
}
export default InheritCollapse;