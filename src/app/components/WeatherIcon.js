import React from 'react';
import _ from 'lodash';
import { WEATHER_EMOJIS } from '../constants';
import PropTypes from 'prop-types';

class WeatherIcon extends React.Component
{
    render()
    {
        let iconID  = this.props.iconID;
        let weatherEmoji = WEATHER_EMOJIS[ iconID ];
        const currentStyle =
        {
            fontSize : '72px'
        };

        if( _.isUndefined( iconID ) )
        {
            return null;
        }

        return(
            <h1 style={ (this.props.isCurrent) ? currentStyle : {} }>{ weatherEmoji }</h1>
        );
    }
}

WeatherIcon.propTypes =
{
    iconID    : PropTypes.string,
    isCurrent : PropTypes.bool
}

export default WeatherIcon;
