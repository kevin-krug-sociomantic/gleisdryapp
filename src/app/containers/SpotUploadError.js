import { connect } from 'react-redux';
import UploadError from '../components/UploadError';

const mapStateToProps = ( state ) =>
{
    return {
    	alert : state.alert
    };
}

const SpotUploadError = connect(
  mapStateToProps,
)( UploadError );

export default SpotUploadError;