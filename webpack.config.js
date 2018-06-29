const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
                test: /\.(css|sass|scss)?$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: [path.resolve('node_modules'), path.resolve('app')],
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
            title: 'React-demo',
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
        new UglifyJsPlugin(),
    ],

    devServer: {
        inline: true,
        port: 8080,
        historyApiFallback: true
    },
};
