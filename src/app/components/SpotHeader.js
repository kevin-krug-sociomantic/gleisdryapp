import React from 'react';
import { EMOJIS } from '../constants';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SpotHeader extends React.Component
{
    render()
    {
        let spot  = this.props.spot;
        let emoji = EMOJIS[ spot ];

        return(
			<Col xs={8} sm={9}><h2>{ spot } { emoji }</h2></Col>
        );
    }
}

SpotHeader.propTypes =
{
    spot : PropTypes.string
}

export default SpotHeader;
