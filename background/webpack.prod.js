const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './background/src/index.js',
  output: {
    filename: 'background.js'
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
  }
};
