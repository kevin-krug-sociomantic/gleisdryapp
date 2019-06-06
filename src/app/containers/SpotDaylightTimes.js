import { connect } from 'react-redux';
import DaylightTimes from '../components/DaylightTimes';
import { COORDINATES_MAP, API_KEY } from '../constants';

const mapStateToProps = ( state ) =>
{
    let displayedWeatherDetails;
    const { spot, uiState, weatherBySpot } = state
    const {
        isFetching,
        currentWeather,
        forecast } = weatherBySpot[ spot ] ||
        {
            isFetching     : true,
            currentWeather : {}
        }

    return currentWeather;
}

const SpotDaylightTimes = connect(
  mapStateToProps,
)( DaylightTimes );

export default SpotDaylightTimes;
