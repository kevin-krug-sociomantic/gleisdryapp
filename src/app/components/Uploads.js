import React from 'react';
import { Grid, Row, Col, ListGroupItem, ListGroup, Image, Alert } from 'react-bootstrap';
import Loader from './Loader/Loader';
import PropTypes from 'prop-types';

class ImageSnippet extends React.Component
{
    render()
    {
        let imageStyle =
        {
            width : '100%'
        };

        return (
            <ListGroupItem>
                <Image style={imageStyle} src={ this.props.file } rounded />
            </ListGroupItem>
        );
    }
}

class ImageSnippets extends React.Component
{
    render()
    {
        return (
            <Loader isLoading={ this.props.isFetching } spot={ this.props.spot }>
                <Row>
                    <Col xs={12} sm={8}>
                        { this.props.uploads.length ? (
                            <ListGroup>
                                { this.props.uploads.map( ( image, index ) =>
                                    <ImageSnippet
                                        fileName = { image.fileName }
                                        file     = { image.file }
                                        key      = { index }
                                    />
                                ) }
                            </ListGroup> ) : (
                            <Alert bsStyle="info">No uploads yet. Be the first to show off your gnarly stunts</Alert>
                            ) }
                    </Col>
                </Row>
            </Loader>
        );
    }
}

ImageSnippets.propTypes =
{
    spot       : PropTypes.string,
    file       : PropTypes.string,
    isFetching : PropTypes.bool,
    uploads    : PropTypes.array
}

export default ImageSnippets;
