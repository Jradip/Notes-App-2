const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: './dist',
    compress: true,
    port: 8080,
    open: true,
    hot: true,
  },
  devtool: 'source-map',
});
