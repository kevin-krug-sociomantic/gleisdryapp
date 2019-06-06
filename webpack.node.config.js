var webpack     = require('webpack');
var path        = require('path');
var fs          = require('fs');
var SOURCE_PATH = path.resolve( __dirname, 'src' );
var nodeModules = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports =

{
    // The configuration for the server-side rendering
    name       : 'server',
    target     : 'node',
    entry      : SOURCE_PATH + 'server/server.js',
    output     :
    {
    path       : './bin/',
    publicPath : 'bin/',
    filename   : 'serverEntryPoint.js'
    },
    externals  : nodeModules,
    module     : {
    loaders    : [
            {
    test       : /\.js$/,
    loaders    : [
                    'babel-loader'
                ]
            },
    { test     : /\.json$/, loader: 'json-loader' },
        ]
    }
};
