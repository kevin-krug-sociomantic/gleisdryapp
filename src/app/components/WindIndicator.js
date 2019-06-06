import React from 'react';
import { EMOJIS } from '../constants';
import PropTypes from 'prop-types';

class WindIndicator extends React.Component
{
    render()
    {
        let angle          = this.props.angle + 'deg';
        let indicatorStyle =
        {
            transform : `rotate( ${angle} )`,
            display   : 'inline-block'
        };
        return ( <div style={ indicatorStyle }>{ EMOJIS[ 'ARROW' ] }</div> );
    }
}

WindIndicator.propTypes =
{
    angle : PropTypes.number
}

export default WindIndicator;
