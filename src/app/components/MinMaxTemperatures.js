import React from 'react';
import { EMOJIS } from '../constants';
import { Row, Col } from 'react-bootstrap';
import { colors } from '../styles';
import PropTypes from 'prop-types';

class MinMaxTemperatures extends React.Component
{
    render()
    {
        const emoji = EMOJIS[ 'THERMOMETER' ];
        return(
            <Row noGutters>
                <Col xs={1}>
                    <h4>{ emoji }</h4>
                </Col>
                <Col xs={11} style={ { textAlign : 'center' } }>
                    <Row><h4 style={ { color : colors.red, margin : 0  } }>{ this.props.maxTemperature }°{ this.props.unit }</h4></Row>
                    <Row><h4 style={ { color : colors.blue, margin : 0 } }>{ this.props.minTemperature }°{ this.props.unit }</h4></Row>
                </Col>
            </Row>
        );
    }
}

MinMaxTemperatures.propTypes =
{
    maxTemperature : PropTypes.number,
    minTemperature : PropTypes.number,
    unit           : PropTypes.string
}

export default MinMaxTemperatures;