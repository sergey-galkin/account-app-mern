const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const outputPath = path.resolve(process.cwd(), 'public');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: outputPath,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64]'
              }
            }
          }
        ],
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
});