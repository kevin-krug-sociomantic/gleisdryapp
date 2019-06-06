import React from 'react';
import { SPOT_IMAGES } from '../constants';
import { Row, Col, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SpotImage extends React.Component
{
    render()
    {
        const IMAGE_SOURCE = SPOT_IMAGES[ this.props.spot ];

        let imageStyle =
        {
            width : '100%'
        };

        return(
            <Row>
                <Col xs={12} sm={8}>
                    <Panel>
                        <img style={ imageStyle  } src= { IMAGE_SOURCE } />
                    </Panel>
                </Col>
            </Row>
        );
    }
}

SpotImage.propTypes =
{
    spot : PropTypes.string
}

export default SpotImage;