const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/game.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new CleanWebpackPlugin(['dist'])],
    devServer: {
        contentBase: './',
        publicPath: '/dist/',
    },
    mode: 'none',
    devtool: 'inline-source-map',
};
