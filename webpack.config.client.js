const webpack = require('webpack');
const path = require('path');

const DEV = process.env.NODE_ENV !== 'production';

module.exports = {
    bail: !DEV,
    devtool: DEV ? 'cheap-module-source-map' : 'source-map',
    target: 'node',
    entry: './src/indexClient.js',
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    /*externals: (context, request, callback) => {
        // Externalize all npm modules.
        if (/^[a-z0-9-][a-z0-9-./]+$/.test(request)) {
            return callback(null, `commonjs ${request}`);
        }
        callback();
    },*/
    resolve: {
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            envName: 'client'
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'json-loader'
                    }
                ]
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: '\'graphql-tag/loader\''
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // prettier-ignore
            'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production'),
        }),
    ],
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
        setImmediate: false,
    },
};