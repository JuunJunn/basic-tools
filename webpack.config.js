const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')// 每次执行构建 remove folder
module.exports = {
  entry: './src/base.js',
  output: {
    filename: 'base.js',
    path: path.resolve(__dirname, './es5')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [new CleanWebpackPlugin(['es5'])]
}
