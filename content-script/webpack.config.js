const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './content-script/src/index.js',
  output: {
    filename: 'content-script.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "inline-source-map"
};
