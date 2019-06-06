import React from 'react';
import WeatherIcon from './WeatherIcon';
import { Row, Col, Panel, ButtonGroup, Button } from 'react-bootstrap';
import { setUIdisplayTime } from '../actions';
import { getStringHourMinute } from '../utils/timeUtils';
import PropTypes from 'prop-types';

let createHandlers = function( dispatch )
{
    let onIconClick = function( timestamp )
    {
        dispatch( setUIdisplayTime( timestamp ) )
    };

    return {
        onIconClick
    };
}

class ForecastIcons extends React.Component
{
    constructor( props )
    {
        super( props );
        this.handlers = createHandlers( this.props.dispatch );
    }

    render()
    {
        const forecast = this.props.forecast;

        if( !forecast.length ) return null;

        const icons = forecast && forecast.map( ( listItem, i ) =>
            <Button style={ { display : 'inline-block', float : 'none'} } key = { i } onClick = { () =>
                this.handlers.onIconClick( listItem.timestamp ) } >
                <h5>{ ( i === 0 ) ? 'now' : getStringHourMinute( listItem.timestamp ) }</h5>
                <WeatherIcon iconID = { listItem.iconID } />
            </Button>
        );

        return (
            <Row>
                <Col xs={12} sm={8}>
                    <Panel style={ { overflow : 'scroll' } }>
                        <ButtonGroup style={ { whiteSpace : 'nowrap'} }>
                            { icons }
                        </ButtonGroup>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

ForecastIcons.propTypes =
{
    dispatch : PropTypes.func,
    forecast : PropTypes.array
}

export default ForecastIcons;
