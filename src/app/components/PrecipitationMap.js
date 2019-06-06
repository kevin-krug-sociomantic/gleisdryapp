import React from 'react';
import { API_KEY, COORDINATES_MAP } from '../constants';
import { Row, Col, Panel } from 'react-bootstrap';

class PrecipitationMap extends React.Component
{
    render()
    {
        const LAYER       = 'precipitation_new';
        const ZOOM        = '3';
        const COORDINATES = COORDINATES_MAP[ this.props.spot ];

        return(
            <Row>
                <Col xs={12} sm={8}>
                    <Panel>
                        <img src={ `http://tile.openweathermap.org/map/${LAYER}/${ZOOM}/${COORDINATES.lon}/${COORDINATES.lat}.png?appid=${API_KEY}` }/>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

export default PrecipitationMap;
