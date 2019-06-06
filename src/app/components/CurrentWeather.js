import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';
import HumidityDonut from './HumidityDonut';
import MinMaxTemperatures from './MinMaxTemperatures';
import WindIndicator from './WindIndicator';
import { getStringHourMinute, getWeekDay } from '../utils/timeUtils';
import { WEEKDAYS } from '../constants';

class CurrentWeather extends React.Component
{
    render()
    {
        if( _.isUndefined( this.props.timestamp ) ) return null;

        const panelHeader = (
            <h3>{`${WEEKDAYS[ getWeekDay( this.props.timestamp ) ]} ${getStringHourMinute( this.props.timestamp )}`}</h3>
            );
        const windHeaderStyles =
        {
            display       : 'inline-block',
            verticalAlign : 'middle'
        };

        return (
            <Row>
                <Col xs={12} sm={8}>
                    <Panel header={ panelHeader }>
                        <Col xs={5}>
                            <WeatherIcon iconID = { this.props.iconID } isCurrent = { true }/>
                            <h3>{ this.props.temperature } °{ this.props.unit }</h3>
                            <h4>{ this.props.description }</h4>
                        </Col>
                        <Col>
                            <h2 style={ Object.assign( {}, windHeaderStyles, { marginTop : '10px'} ) }><WindIndicator angle = { this.props.windDeg } /></h2>
                            <h4 style={ Object.assign( {}, windHeaderStyles, { marginLeft : '10px'} ) }> { this.props.windSpeed } m/s </h4>
                        </Col>
                        <Col xs={2}>
                            <MinMaxTemperatures minTemperature = { this.props.minTemperature } maxTemperature = { this.props.maxTemperature } unit = { this.props.unit } />
                        </Col>
                        <Col xs={5}>
                            <HumidityDonut humidity = { this.props.humidity } />
                        </Col>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

CurrentWeather.propTypes =
{
    timestamp      : PropTypes.number,
    unit           : PropTypes.string,
    temperature    : PropTypes.number,
    minTemperature : PropTypes.number,
    maxTemperature : PropTypes.number,
    windDeg        : PropTypes.number,
    windSpeed      : PropTypes.number,
    humidity       : PropTypes.number,
    description    : PropTypes.string,
    iconID         : PropTypes.string
}

export default CurrentWeather;
