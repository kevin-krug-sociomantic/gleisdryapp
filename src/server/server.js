import Express from 'express';
import path from 'path';
import multer from 'multer';
import db from './db';
import ImageModel from './models/image.model';

const fs = require('file-system');


const server               = Express();
const PORT                 = 8081;
const SUPPORTED_FILE_TYPES = [ 'image/jpeg', 'image/png' ];

let upload = multer(
{
    limits: { fieldSize: 25 * 1024 * 1024 }
}).any(); // adds body obj to request

server.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-serverlication-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

server.get( '/', function (req, res)
{
    res.json({ message: 'hooray! welcome to our api!' });
} );

server.post( '/upload', upload, function ( req, res )
{
    const dataUri  = req.body.file;
    const fileName = req.body.fileName;
    const fileTye  = req.body.fileType;
    const spot     = req.body.spot;
    const sendAt   = req.body.sendAt;
    // console.log( __dirname );
    // let base64Data    = dataUri.replace(/^data:image\/png;base64,/, '' );
    // let pathToWriteTo =  path.join( __dirname, 'uploads', fileName ); // OS independent

    // ensureDirectoryExistence( pathToWriteTo );

    // if ( SUPPORTED_FILE_TYPES.indexOf( fileTye ) == -1 )
    // {
    //     return res.send( 415, 'Supported image formats: jpeg, jpg, jpe, png.' );
    // }

    // fs.writeFile( pathToWriteTo, dataUri, base64Data, function( err )
    // {
    //     if( err )
    //     {
    //         console.log(err);
    //     }
    //     else
    //     {
    //         console.log("The file was saved!");
    //     }
    // } );


    // ImageModel.create({
    //         file : req.body.file,
    //         fileName : req.body.fileName,
    //     },
    //     function (err, user) {
    //         if (err) return res.status(500).send("There was a problem adding the information to the database.");
    //         return res.status(200).send(user);
    //     });

    var image = new ImageModel();

    image.file     = dataUri;
    image.fileName = fileName;
    image.spot     = spot;
    image.sendAt   = sendAt;

    ImageModel.update(
        { fileName : fileName },
        { $setOnInsert : image },
        { upsert : true },
        function( err, writeResult )
        {
            if( err )
                return res.status( 500 ).send( 'upload to db failed' );
            if( !writeResult.upserted )
                return res.status( 409 ).send( 'image of same name already uploaded' );

            ImageModel.find( { spot }, function( err, images )
            {
                if (err)
                    res.send(err);

                // json method sets all header and returns as json
                res.status( 200 ).json( images );
            } );

            // res.status( 200 ).send( 'image saved to db!' );
        }
    );

    // image.save( function( err )
    // {
    //     if (err)
    //     {
    //         return res.send(err);
    //     }
    //     res.json({ message: 'Image saved in DB!' });
    // } );
    //


    // console.log(req, res);
    // var tempPath = req.file.path,
    //     targetPath = path.resolve('./uploads/image.png');

    // if ( path.extname(req.file.name).toLowerCase() === '.png' )
    // {
    //     fs.rename(tempPath, targetPath, function(err) {
    //         if (err) throw err;
    //         console.log("Upload completed!");
    //     });

    // }
    // else
    // {
    //     // fs.unlink(tempPath, function ()
    //     // {
    //     //     if (err) throw err;
    //     //     console.error("Only .png files are allowed!");
    //     // });
    // }
} );


server.get( '/images', function( req, res )
{
    const spot = req.query.spot;
    ImageModel.find( { spot }, function( err, images )
    {
        if (err)
            res.send(err);

        res.json(images);
    } );
} );

server.listen( PORT, function(a)
{
    console.log( `Listening to PORT ${PORT}`);
} );

function ensureDirectoryExistence( filePath )
{
  var dirname = path.dirname( filePath );
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}


export default server;
