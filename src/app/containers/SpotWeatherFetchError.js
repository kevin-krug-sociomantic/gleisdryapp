import { connect } from 'react-redux';
import UploadError from '../components/UploadError';

const mapStateToProps = ( state ) =>
{
    return {
    	alert : state.alert.weatherFetch
    };
}

const SpotWeatherFetchError = connect(
  mapStateToProps,
)( UploadError );

export default SpotWeatherFetchError;
