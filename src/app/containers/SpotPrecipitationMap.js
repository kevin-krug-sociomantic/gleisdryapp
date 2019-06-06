import { connect } from 'react-redux';
import PrecipitationMap from '../components/PrecipitationMap';

const mapStateToProps = ( state ) =>
{
    const { spot } = state
    return { spot };
}

const SpotPrecipitationMap = connect(
  mapStateToProps,
)( PrecipitationMap );

export default SpotPrecipitationMap;
