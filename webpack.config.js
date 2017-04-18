const webpack = require('webpack')
const NukecssPlugin = require('nukecss-webpack')
const FontminPlugin = require('fontmin-webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const __HOT__ = Boolean(process.env.HOT)
const __PROD__ = process.env.NODE_ENV === 'prod'

function url(mimetype, limit = 10000) {
  return [
    {
      loader: 'url-loader',
      options: {limit, mimetype},
    },
  ]
}

let cssLoader = ['style-loader', {loader: 'css-loader', options: {sourceMap: true}}]
let lessLoader = cssLoader.concat({loader: 'less-loader', options: {sourceMap: true}})

if (__PROD__) {
  cssLoader = ExtractTextPlugin.extract({fallback: 'style-loader', use: cssLoader[1]})
  lessLoader = ExtractTextPlugin.extract({fallback: 'style-loader', use: lessLoader.slice(1)})
}

const plugins = [
  new HtmlWebpackPlugin({
    chunks: ['app', 'inline'],
    template: `${__dirname}/src/index.html`,
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
    devtool: 'source-map',
    plugins: plugins.concat([
      new webpack.DefinePlugin({
        __DEV__: 'false',
        __PROD__: 'true',
        __HOT__: 'false',
        'process.env.NODE_ENV': JSON.stringify('production'), // for react minification
      }),
      new ExtractTextPlugin('app.css'),
      new NukecssPlugin({
        sourceMap: true,
        sources: [`file://${__dirname}/src/**.html`],
        sourceWhitelist: [`${__dirname}/src`, /^src\//],
        nukecssOptions: {strict: true},
      }),
      new FontminPlugin(),
      new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
      new ScriptExtHtmlWebpackPlugin({
        inline: /inline\.js$/,
        defaultAttribute: 'async',
      }),
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
      {test: /\.woff(2)?(\?v=.+)?$/, use: ['file-loader']},
      {test: /\.ttf(\?v=.+)?$/, use: ['file-loader']},
      {test: /\.svg(\?v=.+)?$/, use: ['file-loader']},
      {test: /\.eot(\?v=.+)?$/, use: ['file-loader']},

      {test: /\.png$/, use: url('image/png')},
      {test: /\.gif$/, use: url('image/gif')},
      {test: /\.jp(e)?g$/, use: url('image/jpeg')},

      {test: /\.js$/, use: ['babel-loader'], include: `${__dirname}/src`},
      {test: /\.less$/, use: lessLoader, include: __dirname},
      {test: /\.css$/, use: cssLoader, include: __dirname},
    ],
  },
}, overrides[process.env.NODE_ENV || 'dev'])
