var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlStringReplace = require('html-string-replace-webpack-plugin')
var ZipPlugin = require('zip-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.buildTest.productionSourceMap, extract: true })
  },
  devtool: config.buildTest.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.buildTest.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.buildTest.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, '../CubeModule.json'), to: path.join(__dirname, '../dist/CubeModule.json') },
    ]),
      new webpack.ProvidePlugin({
      '$envType': path.resolve(__dirname, '../config/test.env.js'),
      '$common': path.resolve(__dirname, '../src/js/common.js'),
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': '"production"'
    }),
/*    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),*/
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.buildTest.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new HtmlStringReplace({
      enable: true,
      patterns: [
        {
          match: /src=\"([^\"]*)\"/g,
          replacement: function (match, $1) {
            if($1.indexOf('ver=') != -1) {
              var ver = $1.substring(0, $1.indexOf("ver="));
              console.log('src="' + ver + new Date().getTime() + '"');
              return 'src="' + ver + new Date().getTime() + '"';
            } else  {
              return 'src="' +$1 + '"';
            }
          }
        }
      ]
    }),
    new ZipPlugin({
      path: path.join(__dirname, '../'),
      filename: config.buildTest.zipName,
    }),
  ]
})

if (config.buildTest.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.buildTest.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
