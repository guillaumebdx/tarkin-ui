import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';

class Step2 extends Component
{



    render()
    {
        return (
            <div className="center">
                <Typography variant='title'>
                    A combien estimez-vous votre bien ?
                </Typography>
                <Typography variant='caption'>
                    Ici, la valeur estimée du bien à aujourd'hui.
                </Typography>
            </div>
        )
    }


}
export default Step2;