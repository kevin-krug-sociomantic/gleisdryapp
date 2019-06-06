import { connect } from 'react-redux';
import SpotImage from '../components/SpotImage';

const mapStateToProps = ( state ) =>
{
    const { spot } = state
    return { spot };
}

const CurrentSpotImage = connect(
  mapStateToProps,
)( SpotImage );

export default CurrentSpotImage;