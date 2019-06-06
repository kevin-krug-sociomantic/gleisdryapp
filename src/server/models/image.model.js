import mongoose from 'mongoose';
mongoose.Promise = global.Promise; // use native promises

const Schema       = mongoose.Schema;

const ImageModel = new Schema(
{
    file     : String,
    fileName : String,
    spot     : String,
    sendAt   : Number
} );

mongoose.model( 'ImageModel', ImageModel );

export default mongoose.model( 'ImageModel' );
