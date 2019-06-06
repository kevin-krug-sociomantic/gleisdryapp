import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import GleisDryAppNavBar from '../components/GleisDryAppNavBar';
import Loader from '../components/Loader/Loader';
import {
    CurrentSpotWeather,
    CurrentSpot,
    CurrentSpotImage,
    SpotTemperaturePlot,
    SpotForecastIcons,
    SpotDaylightTimes,
    SpotUploadError,
    UnitSwitchContainer
} from '../containers';
import { fetchWeatherIfNeeded } from '../actions';

class Home extends React.Component
{
    constructor( props )
    {
        super( props );
        props.dispatch( fetchWeatherIfNeeded( this.props.spot, 'current' ) );
        props.dispatch( fetchWeatherIfNeeded( this.props.spot, 'forecast' ) );
    }

    render()
    {
        return (
            <div>
                <GleisDryAppNavBar path={ this.props.match.path } spot={ this.props.spot }/>
                <Grid>
                    <Row>
                        <Col xs={12} sm={8}>
                            <Row>
                                <CurrentSpot />
                                <UnitSwitchContainer />
                            </Row>
                        </Col>
                    </Row>
                    <SpotUploadError />
                    <Loader isLoading={ this.props.isFetching } spot={ this.props.spot }>
                        <CurrentSpotWeather />
                        <SpotForecastIcons />
                        <SpotDaylightTimes />
                        <SpotTemperaturePlot />
                        <CurrentSpotImage />
                    </Loader>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ( state ) =>
{
    const { spot, uiState, weatherBySpot } = state
    const { isFetching, currentWeather } = weatherBySpot[ spot ] || { isFetching : true };

    // loader props
    return {
        spot,
        isFetching
    };
}

const Homepage = connect(
  mapStateToProps,
)( Home );

export default Homepage;
