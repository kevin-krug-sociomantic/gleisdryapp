var path              = require('path');
var DIST_PATH         = path.resolve( __dirname, 'dist' );
var SOURCE_PATH       = path.resolve( __dirname, 'src' );
var nodeExternals     = require('webpack-node-externals');

module.exports =
[
    {
        name   : 'client',
        entry  : SOURCE_PATH + '/app/app.js',
        output :
        {
            path       : DIST_PATH,
            filename   : 'app.dist.js',
            publicPath : '/app/'
        },
        module :
        {
            loaders :
            [
                {
                    test       : /.jsx?$/,
                    loader     : 'babel-loader',
                    exclude    : /node_modules/,
                    query      : {
                    presets    :
                    [
                        'es2015',
                        'react'
                    ]
                    }
                },
                {
                    test   : /\.css$/,
                    loader : 'style-loader'
                },
                {
                    test   : /\.css$/,
                    loader : 'css-loader',
                    query  :
                    {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            ]
        }
        // target    : 'node', // in order to ignore built-in modules like path, fs, etc.

    },
    {
        name  : 'server',
        entry : SOURCE_PATH + '/server/server.js',
        node  :
        {
            __dirname: true
        },
        target : 'node',
        output:
        {
            path       : DIST_PATH,
            filename   : 'server.dist.js',
            publicPath : '/server/'
        },
        module:
        {
            rules:
            [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
            }]
        },
        externals : [nodeExternals()], // in order to ignore all modules in node_modules folder
    }
]
