const path = require('path');
const pkg = require('./package.json');
const camelcase = require('camelcase');
const process = require('process');
const env = process.env;

const NODE_ENV = env.NODE_ENV;
const PROD = NODE_ENV === 'production';

module.exports = {
    entry: './src/cytoscape-context-menus.js',
    output: {
        path: path.join(__dirname),
        filename: pkg.name + '.js',
        library: camelcase(pkg.name),
        libraryTarget: 'umd',
    },
    devtool: PROD ? false : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};