import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { EMOJIS } from '../constants';

class DaylightTimes extends React.Component
{
    constructor( props )
    {
        super(props);
        this.state = { open : true };
    }

    render()
    {
        if( !this.props.sunrise || !this.props.sunset ) return null;

        let panelHeader = (
            <h3 onClick={ ()=> this.setState( { open: !this.state.open } ) }>
                Daylight Times Today
            </h3> );

        return (
            <Row>
                <Col xs={12} sm={8}>
                    <Panel collapsible expanded={this.state.open} header={panelHeader} >
                        <h4>{ EMOJIS[ 'SUNRISE' ] } sunrise <span style={{ float : 'right' }}>{ this.props.sunrise }</span></h4>
                        <h4>{ EMOJIS[ 'SUNSET' ] } sunset <span style={{ float : 'right' }}>{ this.props.sunset }</span></h4>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

DaylightTimes.propTypes =
{
    sunset      : PropTypes.string,
    sunrise     : PropTypes.string
}

export default DaylightTimes;
