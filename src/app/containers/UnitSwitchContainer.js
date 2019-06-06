import { connect } from 'react-redux';
import UnitSwitch from '../components/UnitSwitch';

const mapStateToProps = ( state ) =>
{
    const { spot, uiState, weatherBySpot } = state;
    const { displayedUnit } = uiState;

    return { unit : displayedUnit };
}

const UnitSwitchContainer = connect(
  mapStateToProps,
)( UnitSwitch );

export default UnitSwitchContainer;