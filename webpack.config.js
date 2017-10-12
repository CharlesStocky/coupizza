var path = require('path');
var webpack = require('webpack'); 
require('babel-polyfill'); 

module.exports = {
  entry: __dirname + '/app/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),  
    filename: "index_bundle.js"  
  }, 
  module: {
    loaders: [
      {test: /\.js$/, exclude: [/node_modules/, /server/], use: 'babel-loader'},  
      {test: /\.css/, use: ['style-loader', 'css-loader']},
      {test: /\.pug$/, use: 'html-loader'}, 
      {test: /\.jpg/, use: 'url-loader'}
    ] 
  },
  resolve: {
    extensions: ['.js'] 
  },  
  node:{
    fs: "empty"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(), 
    new webpack.HotModuleReplacementPlugin(),  
    new webpack.NoEmitOnErrorsPlugin()
  ] 
}
