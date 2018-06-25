const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './app/App.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                include: [path.resolve('app')],
                exclude: [path.resolve('node_modules')],
                use: 'babel-loader'
            },
            {
                test: /\.(jsx|js)?$/,
                include: [path.resolve('app')],
                exclude: [path.resolve('node_modules')],
                use: 'eslint-loader'
            },
            {
                test: /\.(css|sass)?$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                include: [path.resolve('app')],
                exclude: [path.resolve('node_modules')],
                use: 'url-loader?limit=8192'
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css']
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: 'true',
            dry: false
        }),
        new HtmlWebpackPlugin({
            title: 'React W.Music',
            template: './app/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
        new ExtractTextPlugin({
            filename: 'app.bundle.css',
        }),
        new StyleExtHtmlWebpackPlugin({
            minify: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            PRODUCTION: JSON.stringify(false),
            STAGING: JSON.stringify(false),
            DEVELOPMENT: JSON.stringify(true),
            VERSION_NAME: JSON.stringify('0.0.18301'),
            VERSION_CODE: JSON.stringify('1'),
        }),
    ],
};