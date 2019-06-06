import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { bindAll } from 'lodash';
import { postImage } from '../actions';
import styles from './Loader/loader.css';
import PropTypes from 'prop-types';

class ImageUploader extends Component {

  constructor()
  {
    super();
    bindAll(this, 'handleFile', 'handleSubmit');
    this.state = {
            data_uri : '',
            fileName : '',
            fileType : ''
        };
    this.initialState = this.state;
  }

  handleSubmit( e )
  {
    e.preventDefault();

    const dataUri  = this.state.data_uri;
    const fileName = this.state.fileName;
    const fileType = this.state.fileType;
    const spot     = this.props.spot;
    const sendAt   = Date.now();

    this.props.dispatch( postImage( fileName, fileType, dataUri, spot, sendAt ) );

    e.target.reset(); // reset form
    this.resetState();
  }

  handleFile( e )
  {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = ( upload ) =>
    {
        this.setState(
        {
            data_uri : upload.target.result, // base64 encoded string
            fileName : file.name,
            fileType : file.type
        } );
    };

    if( file )
        reader.readAsDataURL( file );
    else
        this.resetState();
  }

  resetState()
  {
      this.setState( this.initialState );
  }

  render() {

    let uploading = <div className ={ styles.dots}><span>.</span><span>.</span><span>.</span></div>;

    return (
        <Row style={ { marginBottom : '15px' } }>
            <Col xs={12} sm={8}>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                  <input disabled={ this.props.isUploading } className="col-xs-9" type="file" name="file" onChange={this.handleFile} style={{ display: "inline-block", padding : '6px 0 6px 0' }}/>
                  <button disabled={ this.props.isUploading || !this.state.fileName } className='btn btn-primary' type="submit" style={{ display: "inline-block", float : "right", width : '71.38px' }}>
                    { this.props.isUploading ? uploading : 'Upload' }
                  </button>
                </form>
            </Col>
        </Row>
    );
  }
}

ImageUploader.propTypes =
{
    dispatch    : PropTypes.func,
    spot        : PropTypes.string,
    isUploading : PropTypes.bool,
}

export default connect()(ImageUploader); // adds dispatch to props
