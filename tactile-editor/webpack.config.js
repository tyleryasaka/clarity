const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin')

const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
  path: './dist/index.js',
  logLevel: 0
})

module.exports = [
  {
    mode: 'development',
    entry: './src/index.js',
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'index.js'
    }
  },
  {
    mode: 'development',
    entry: './src/react.js',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'react.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      ElectronReloadWebpackPlugin()
    ]
  }
]
