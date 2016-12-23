const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

function url(mime, limit = 10000) {
  return `url?limit=${limit}&mimetype=${mime}`
}

const plugins = [
  new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    inlineSource: 'inline.js$',
  }),
  new HtmlWebpackInlineSourcePlugin(),
]

const overrides = {
  dev: {
    devtool: 'cheap-module-eval-source-map',
    plugins: plugins.concat([
      new webpack.DefinePlugin({
        __DEV__: 'true',
        __PROD__: 'false',
      }),
    ]),
  },
  prod: {
    plugins: plugins.concat([
      new webpack.DefinePlugin({
        __DEV__: 'false',
        __PROD__: 'true',
        'process.env.NODE_ENV': JSON.stringify('production'), // for react minification
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ]),
  },
}

module.exports = Object.assign({
  entry: {
    app: './src/entry.js',
    sw: './src/sw/entry.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    publicPath: process.env.WEBPACK_PUBLIC_PATH || '/',
  },
  resolve: {
    root: [__dirname],
  },
  module: {
    loaders: [
      {test: /\.woff(2)?(\?v=.+)?$/, loader: url('application/font-woff')},
      {test: /\.ttf(\?v=.+)?$/, loader: url('application/octet-stream')},
      {test: /\.svg(\?v=.+)?$/, loader: url('image/svg+xml')},
      {test: /\.eot(\?v=.+)?$/, loader: 'file'},

      {test: /\.png$/, loader: url('image/png')},
      {test: /\.gif$/, loader: url('image/gif')},

      {test: /\.js$/, loaders: ['babel'], include: `${__dirname}/src`},
      {test: /\.less$/, loader: 'style!css!less', include: __dirname},
      {test: /\.css$/, loader: 'style!css'},
    ],
  },
}, overrides[process.env.NODE_ENV || 'dev'])
