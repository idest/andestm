var webpack = require('webpack');

module.exports = {
  entry: {
    index: './assets/index',
    matrices: './assets/matrices'
  },
  output: {
    path: __dirname + '/static',
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [{
      test: /\.js/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [env]
        }
      }
    }, {
      test: /\.scss/,
      use: [{
        loader: 'style-loader' //creates style nodes from JS strings
      }, {
        loader: 'css-loader' //translates CSS into CommonJS
      }, {
        loader: 'postcss-loader' //enhances CSS
      }, {
        loader: 'sass-loader'//compiles Sass to CSS
      }]
    }]
  }
};
