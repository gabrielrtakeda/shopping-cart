const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const CLIENT_DIR = path.resolve(__dirname, '../client')

module.exports = env => {
  const { PLATFORM, VERSION } = env
  const dist = path.resolve(__dirname, '../dist')

  return merge([
    {
      mode: env.NODE_ENV,
      output: {
        path: dist,
        publicPath: '/',
        filename: 'main.js'
      },
      entry: ['@babel/polyfill', CLIENT_DIR],
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader'
            ]
          }
        ]
      },
      plugins: [
        new CleanWebpackPlugin([dist]),
        new CopyWebpackPlugin([ { from: path.resolve(CLIENT_DIR, 'static') } ]),
        new HtmlWebpackPlugin({
          template: path.resolve(CLIENT_DIR, 'index.html'),
          favicon: path.resolve(CLIENT_DIR, 'static', 'favicon.ico'),
          filename: './index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(VERSION),
          'process.env.PLATFORM': JSON.stringify(PLATFORM)
        })
      ],
      devServer: {
        port: 3000,
        open: true,
        proxy: {
          '/graphql': 'http://localhost:8080'
        }
      }
    }
  ])
}
