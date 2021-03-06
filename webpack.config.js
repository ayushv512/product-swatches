const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode:"development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Flipkart</title><link rel="icon" href="https://static-assets-web.flixcart.com/www/promos/new/20150528-140547-favicon-retina.ico" sizes="32x32"><style>@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap");</style></head><body><div id=\"app\"></div></body></html>',
      filename: 'index.html',
    }),
  ],
  devServer: {
    open: true
  }
};

module.exports = config;