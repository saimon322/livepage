const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = (env, argv) => {

    return merge(common(argv.mode), {
        // devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime'],
                            sourceType: 'unambiguous',
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                // sourceMap: true,
                                url: false
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: true,
                                sassOptions: {
                                    // indentWidth: 4,
                                    // outputStyle: 'compressed',
                                    outputStyle: 'expanded',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                // sourceMap: true,
                                url: false
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // sourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },
        optimization: {
            minimize: false
            // minimizer: [
            //     new UglifyJsPlugin({
            //         parallel: true,
            //     }),
            // ],
        },
        plugins: [
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: "[name].css"
            }),
        ],
    });
};
