// @todo: create own MongoDB locally
import mongoose from 'mongoose';
mongoose.Promise = global.Promise; // use native promises
mongoose.connect( 'mongodb://localhost',
{
	useMongoClient: true,
} );
