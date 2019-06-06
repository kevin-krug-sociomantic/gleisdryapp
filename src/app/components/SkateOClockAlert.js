
import React from 'react';
import { Alert } from 'react-bootstrap';
import { EMOJIS } from '../constants';

class SkateOClockAlert extends React.Component
{
    render()
    {
        return (
			<Alert bsStyle="warning"><strong>Skate { EMOJIS['CLOCK'] } 'clock</strong></Alert>
		);
    }
}

export default SkateOClockAlert;
