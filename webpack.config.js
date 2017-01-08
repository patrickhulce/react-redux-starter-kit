const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

const __HOT__ = Boolean(process.env.HOT)

function url(mime, limit = 10000) {
  return `url?limit=${limit}&mimetype=${mime}`
}

const plugins = [
  new HtmlWebpackPlugin({
    chunks: ['app', 'inline'],
    template: `${__dirname}/src/index.html`,
    inlineSource: 'inline\.(js|css)$',
  }),
]

const overrides = {
  dev: {
    devtool: 'cheap-module-eval-source-map',
    plugins: plugins.concat([
      new webpack.DefinePlugin({
        __DEV__: 'true',
        __PROD__: 'false',
        __HOT__: JSON.stringify(__HOT__),
      }),
    ]),
  },
  prod: {
    plugins: plugins.concat([
      new webpack.DefinePlugin({
        __DEV__: 'false',
        __PROD__: 'true',
        __HOT__: 'false',
        'process.env.NODE_ENV': JSON.stringify('production'), // for react minification
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
      new HtmlWebpackInlineSourcePlugin(),
    ]),
  },
}

module.exports = Object.assign({
  entry: {
    inline: './src/entry-inline.js',
    app: './src/entry.js',
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
