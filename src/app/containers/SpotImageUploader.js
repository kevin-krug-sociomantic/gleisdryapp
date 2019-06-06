import { connect } from 'react-redux';
import ImageUploader from '../components/ImageUploader';

const mapStateToProps = ( state ) =>
{
    const { spot, uiState, weatherBySpot, uploadsBySpot } = state;
    const {
        isFetching,
        isUploading,
    } = uploadsBySpot[ spot ];

    return { spot, isUploading };
}

const SpotImageUploader = connect(
  mapStateToProps,
)( ImageUploader );

export default SpotImageUploader;
