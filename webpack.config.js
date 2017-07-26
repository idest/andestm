var webpack = require('webpack');
var vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.v2.rules;
module.exports = {
  entry: {
    index: './assets/index',
    matrices: './assets/matrices',
    explorer: './assets/explorer'
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
          presets: ['env']
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
    }, {
      test: /\.html/,
      use: {
        loader: 'html-loader'
      }
    }].concat(vtkRules)
  }
};
