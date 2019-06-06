import { connect } from 'react-redux';
import ForecastIcons from '../components/ForecastIcons';

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

    return { forecast : [ currentWeather, ...forecast ] };
}

const SpotForecastIcons = connect(
  mapStateToProps,
)( ForecastIcons );

export default SpotForecastIcons;
