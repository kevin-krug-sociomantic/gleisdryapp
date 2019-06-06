
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Panel, ButtonGroup, Button } from 'react-bootstrap';
import { setTemperatureUnit } from '../actions';
import { selectedStyle } from '../styles';
import PropTypes from 'prop-types';

let createHandlers = function( dispatch )
{
    let onButtonClick = function( unit )
    {
        dispatch( setTemperatureUnit( unit ) )
    };

    return {
        onButtonClick
    };
}

class UnitSwitch extends React.Component
{
	constructor( props )
    {
        super( props );
        this.handlers = createHandlers( this.props.dispatch );
    }

	render()
	{
		return(
            <Col xs={4} sm={3}>
    			<ButtonGroup justified>
    			    <Button href="#" style = { this.props.unit === 'C' ? selectedStyle : {} } onClick = { () => this.handlers.onButtonClick( 'C' ) }>°C</Button>
    			    <Button href="#" style = { this.props.unit === 'F' ? selectedStyle : {} } onClick = { () => this.handlers.onButtonClick( 'F' ) }>°F</Button>
    			</ButtonGroup>
            </Col>
		);
	}
}

UnitSwitch.propTypes =
{
    dispatch : PropTypes.func,
    unit     : PropTypes.string
}

export default UnitSwitch;