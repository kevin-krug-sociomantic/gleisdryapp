import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { removeAlert } from '../actions';
import PropTypes from 'prop-types';

class UploadError extends React.Component
{
	constructor( props, context )
	{
    	super( props, context );
	    this.handleDismiss = this.handleDismiss.bind( this );
  	}

	handleDismiss()
	{
        let { dispatch } = this.props;
        dispatch( removeAlert() );
  	}

    render()
    {
        let alert = this.props.alert;

    	if( Object.keys( alert ).length === 0
            && alert.constructor === Object )
    	{
    		return null;
    	}

        return (
        	<Row>
                <Col xs={12} sm={8}>
					<Alert bsStyle="danger" onDismiss={this.handleDismiss}><strong>{ alert.message }</strong></Alert>
				</Col>
			</Row>
		);
    }
}

UploadError.propTypes =
{
    alert : PropTypes.object
}

export default UploadError;