const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

const __HOT__ = Boolean(process.env.HOT)

function url(mimetype, limit = 10000) {
  return [
    {
      loader: 'url-loader',
      options: {limit, mimetype}
    }
  ]
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
      new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackInlineSourcePlugin(),
    ]),
  },
}

module.exports = Object.assign({
  entry: {
    inline: './src/entry-inline.js',
    app: './src/entry.js',
    sw: './src/sw/entry.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    publicPath: process.env.WEBPACK_PUBLIC_PATH || '/',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
  },
  module: {
    rules: [
      {test: /\.woff(2)?(\?v=.+)?$/, use: url('application/font-woff')},
      {test: /\.ttf(\?v=.+)?$/, use: url('application/octet-stream')},
      {test: /\.svg(\?v=.+)?$/, use: url('image/svg+xml')},
      {test: /\.eot(\?v=.+)?$/, use: ['file-loader']},

      {test: /\.png$/, use: url('image/png')},
      {test: /\.gif$/, use: url('image/gif')},

      {test: /\.js$/, use: ['babel-loader'], include: `${__dirname}/src`},
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'], include: __dirname},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
    ],
  },
}, overrides[process.env.NODE_ENV || 'dev'])
