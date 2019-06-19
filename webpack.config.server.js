const webpack = require('webpack');
const path = require('path');

const DEV = process.env.NODE_ENV !== 'production';


const findLinkedModules = (nodeModulesPath) => {
    const modules = []

    fs.readdirSync(nodeModulesPath).forEach(dirname => {
        const modulePath = path.resolve(nodeModulesPath, dirname)
        const stat = fs.lstatSync(modulePath)

        if (dirname.startsWith('.')) {
            // not a module or scope, ignore
        } else if (dirname.startsWith('@')) {
            // scoped modules
            modules.push(...findLinkedModules(modulePath))
        } else if (stat.isSymbolicLink()) {
            const realPath = fs.realpathSync(modulePath)
            const realModulePath = path.resolve(realPath, 'node_modules')

            modules.push(realModulePath)
        }
    })

    return modules
}

module.exports = {
    bail: !DEV,
    devtool: DEV ? 'cheap-module-source-map' : 'source-map',
    target: 'node',
    entry: './src/index.js',
    output: {
        // path: path.resolve(__dirname, 'build/server'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    externals: (context, request, callback) => {
        // Externalize all npm modules.
        if (/^[a-z0-9-][a-z0-9-./]+$/.test(request)) {
            return callback(null, `commonjs ${request}`);
        }
        callback();
    },
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
                        loader: 'babel-loader'
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