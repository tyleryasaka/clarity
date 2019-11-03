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
    entry: './src/index.ts',
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'index.js'
    }
  },
  {
    mode: 'development',
    entry: './src/react.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: { rules: [{
      test: /\.ts(x?)$/,
      include: /src/,
      use: [{ loader: 'ts-loader' }]
    }] },
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
