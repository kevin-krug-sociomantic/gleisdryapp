// console.log([1, 2, 3].map(n => n + 1))
var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use( express.static( __dirname ) );

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.sendFile( __dirname + '/src/app/index.html' );
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
