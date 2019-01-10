const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./popup/src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              globalVars: {
                "default-text-color-selected": '#1db954',
                "default-text-color-selected-hover": '#1ed760',
                "default-text-color-hover": "#fff",
                "default-text-color": "hsla(0,0%,100%,.6)",
                "page-background": "#1c1c1f"
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  devtool: "inline-source-map",
  plugins: [new HtmlWebPackPlugin({
    template: './popup/public/index.html',
    filename: 'popup.html'
  })]
};