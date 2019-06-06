import { connect } from 'react-redux';
import SpotHeader from '../components/SpotHeader';

const mapStateToProps = ( state ) =>
{
    const { spot } = state
    return { spot };
}

const CurrentSpot = connect(
  mapStateToProps,
)( SpotHeader );

export default CurrentSpot;
