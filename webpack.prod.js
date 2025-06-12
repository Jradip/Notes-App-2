const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

// ✅ Sudah ada
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),

    //  app.webmanifest
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/public/app.webmanifest', to: 'app.webmanifest' },
        { from: 'src/public/icons', to: 'icons' },
      ],
    }),

    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/service-worker.js'),
      swDest: 'sw.bundle.js',
    }),
  ],
});
