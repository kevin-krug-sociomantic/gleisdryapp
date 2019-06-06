import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import GleisDryAppNavBar from '../components/GleisDryAppNavBar';
import {
    CurrentSpot,
    SpotImageUploader,
    SpotUploadError,
    SpotUploads,
} from '../containers';

class UploadPage extends React.Component
{
    render()
    {
        return (
           <div>
                <GleisDryAppNavBar path = { this.props.match.path }/>
                <Grid>
                    <Row><CurrentSpot /></Row>
                    <SpotImageUploader />
                    <SpotUploadError />
                    <SpotUploads />
                </Grid>
            </div>
        );
    }
}

export default UploadPage;
