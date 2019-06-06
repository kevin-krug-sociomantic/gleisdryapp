import { connect } from 'react-redux';
import TemperaturePlot from '../components/TemperaturePlot';
import { unitConversionMap } from '../utils';

const mapStateToProps = ( state ) =>
{
    const { spot, uiState, weatherBySpot } = state
    const {
        isFetching,
        currentWeather,
        forecast } = weatherBySpot[ spot ] ||
        {
            isFetching     : true,
            currentWeather : {},
            forecast       : []
        }
    const unit = uiState && uiState.displayedUnit;
    const convertedForecast = forecast.map( weather =>
        Object.assign( {}, weather, 
            { temperature : unitConversionMap[ unit ]( weather.temperature ) } )
    );

    return {
        forecast : convertedForecast,
        unit
    };
}

const SpotTemperaturePlot = connect(
  mapStateToProps,
)( TemperaturePlot );

export default SpotTemperaturePlot;
