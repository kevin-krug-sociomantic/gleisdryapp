import { connect } from 'react-redux';
import CurrentWeather from '../components/CurrentWeather';
import { COORDINATES_MAP, API_KEY } from '../constants';
import { unitConversionMap } from '../utils';

const mapStateToProps = ( state ) =>
{
    let displayedWeatherDetails;
    let displayedWeather;
    let currentSpotWeather;
    const { spot, uiState, weatherBySpot } = state
    const {
        isFetching,
        currentWeather,
        forecast } = weatherBySpot[ spot ] ||
        {
            isFetching     : true,
            currentWeather : {}
        }

    if( uiState && uiState.displayedTime )
    {
        displayedWeatherDetails = forecast.find(
            listItem => listItem.timestamp === uiState.displayedTime );
    }
    if( uiState && uiState.displayedUnit )
    {
        const unit = uiState.displayedUnit;
        displayedWeather = displayedWeatherDetails || currentWeather;
        currentSpotWeather = Object.assign( {}, displayedWeather,
            { temperature : getConvertedTemperature( displayedWeather.temperature, unit ) },
            { minTemperature : getConvertedTemperature( displayedWeather.minTemperature, unit ) },
            { maxTemperature : getConvertedTemperature( displayedWeather.maxTemperature, unit ) } );
    }

    let props = currentSpotWeather;

    props.unit = uiState && uiState.displayedUnit;
    // loader props
    props.isFetching = isFetching;
    props.spot       = spot;

    return props;
}

const CurrentSpotWeather = connect(
  mapStateToProps,
)( CurrentWeather );

export default CurrentSpotWeather;


const getConvertedTemperature = ( temperature, unit ) =>
{
    return unitConversionMap[ unit ]( temperature )
}