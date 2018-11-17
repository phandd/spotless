const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
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
                "default-text-color-selected": '#1ed760',
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
  devtool: "eval-source-map",
  plugins: [new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: 'index.html'
  })]
};