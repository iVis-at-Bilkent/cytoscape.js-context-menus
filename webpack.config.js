const path = require('path');
const pkg = require('./package.json');
const camelcase = require('camelcase');
const process = require('process');
const env = process.env;

const NODE_ENV = env.NODE_ENV;
const PROD = NODE_ENV === 'production';
const SRC_DIR = "./src";

module.exports = {
    entry: path.join(__dirname, SRC_DIR, pkg.name + '.js'),
    output: {
        path: path.join(__dirname),
        filename: pkg.name + '.js',
        library: camelcase(pkg.name),
        libraryTarget: 'umd',
    },
    mode: PROD ? 'production' : 'development',
    // devtool: PROD ? false : 'inline-source-map',
    optimization: {
        minimize: false,
    },
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