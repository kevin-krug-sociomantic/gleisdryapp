import { connect } from 'react-redux';
import Uploads from '../components/Uploads';

const mapStateToProps = ( state ) =>
{
    const { spot, uiState, weatherBySpot, uploadsBySpot } = state;
    const {
        isFetching,
        isUploading,
        uploads } = uploadsBySpot[ spot ] ||
        {
            isFetching : true,
            isUploading : false,
            uploads    : []
        }
    const sortedUploads = uploads.sort( ( a, b ) =>
    {
        return b.sendAt - a.sendAt;
    } );

    return {
        uploads : sortedUploads,
        // loader props
        isFetching,
        spot
    };
}

const SpotUploads = connect(
    mapStateToProps,
)( Uploads );

export default SpotUploads;
