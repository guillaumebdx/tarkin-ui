import React, { Component } from 'react';

class InheritCollapse extends Component
{
    
    render()
    {
        const Introduction = () => {
            let intro;
            if (this.props.inheritData.heirs === undefined) {
                intro = "Utilisez l'assistant afin de saisir les membres de votre famille"
            } else {
                    intro = "Nombre d'héritiers : " + this.props.inheritData.heirs.length;
            }
            return (
                intro
            )
        }

        const Heirs = () => {
            return (
                <div>
                {this.props.inheritData.heirs.map(item => 
                <div class="marginBottom">
                    <div className="flex spaceBetween width50">
                        <p>Part revenant à {item.firstName} :</p> 
                        <p className="littlePadding">{item.amount} €</p>
                    </div>
                    <div className="flex spaceBetween width50">
                        <p>Abattement {item.familyPosition} :</p> 
                        <p className="littlePadding">{item.allowance} €</p>
                    </div>
                    <div className="flex spaceBetween width50">
                        <p>Part taxable</p> 
                        <p className="littlePadding">{item.taxablePart} €</p>
                    </div>
                    <div className="flex spaceBetween width50">
                        <p>Droits à payer</p> 
                        <p className="littlePadding">{item.tax} €</p>
                    </div>
                    <div className="flex spaceBetween width50">
                        <p>Part nette en {item.propertyType}</p> 
                        <p className="littlePadding">{item.netSum} €</p>
                    </div>
                
                </div>
                )}
                </div>
            )
        }

        return (
            <div>
                <div className="marginBottom">
                    <Introduction />
                </div>
                   {this.props.inheritData.heirs !== undefined && <Heirs /> } 
            </div>
        )
    }
}
export default InheritCollapse;