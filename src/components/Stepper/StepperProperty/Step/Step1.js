import React, { Component } from 'react';
import Typography           from '@material-ui/core/Typography';

class Step1 extends Component
{



    render()
    {
        return (
            <div className="center">
                <Typography variant='title'>
                Donnez un nom à votre bien
                </Typography>
                <Typography variant='caption'>
                Le nom n'a pas grande importance, il vous servira pour reconnaître le bien dans les analyses et conseils.
                </Typography>
            </div>
        )
    }


}
export default Step1;