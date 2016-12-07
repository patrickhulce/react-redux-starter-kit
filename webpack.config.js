const webpack = require('webpack')

function url(mime, limit = 10000) {
  return `url?limit=${limit}&mimetype=${mime}`
}

const overrides = {
  dev: {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: 'true',
        __PROD__: 'false',
      }),
    ],
  },
  prod: {
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: 'false',
        __PROD__: 'true',
        'process.env.NODE_ENV': JSON.stringify('production'), // for react minification
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ],
  },
}

module.exports = Object.assign({
  entry: './src/entry.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'app.js',
    publicPath: process.env.WEBPACK_PUBLIC_PATH || '/assets/',
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
