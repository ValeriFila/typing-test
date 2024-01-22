const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require("webpack")
const {ProgressPlugin} = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    // Указываем путь до входной точки:
    entry: path.resolve(__dirname, 'src', 'index.js'),
    // Описываем, куда следует поместить результат работы:
    output: {
        clean: true,
        // Путь до директории (важно использовать path.resolve):
        path: path.resolve(__dirname, 'docs'),
        // Имя файла со сборкой:
        filename: 'bundle.js',
        assetModuleFilename: './[name][ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        }),
        new ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
    ],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ],

            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            }
        ]
    },
    devtool: 'source-map',
    watch: true,
    devServer: {
        static: {
            directory: path.join(__dirname, 'docs'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
}
