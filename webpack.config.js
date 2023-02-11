// Webpack 4 configuration
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

var name = 'clappr-chromecast-plugin'
var outputFile, plugins = [], optimization = {}

if (process.env.npm_lifecycle_event === 'dist') {
  outputFile = name + '.min.js'
  optimization.minimizer = [
    new TerserPlugin({
    }),
  ]
} else {
  outputFile = name + '.js'
  optimization.minimize = false
}

module.exports = {
  entry: path.resolve(__dirname, 'src/chromecast.js'), // eslint-disable-line
  devtool: 'source-map',
  optimization: optimization,
  output: {
    path: path.resolve(__dirname, 'lib'), // eslint-disable-line
    filename: outputFile,
    library: 'ChromecastPlugin',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        include: [
          path.resolve(__dirname, 'src') // eslint-disable-line
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-inline-loader',
        },
      },
    ],
  },
  plugins: plugins,
  externals: {
    '@clappr/player': {
      amd: '@clappr/player',
      commonjs: '@clappr/player',
      commonjs2: '@clappr/player',
      root: 'Clappr'
    }
  },
  devServer: {
    contentBase: [
      path.resolve(__dirname, 'public'), // eslint-disable-line
    ],
    // publicPath: '/js/',
    disableHostCheck: true, // https://github.com/webpack/webpack-dev-server/issues/882
    compress: true,
    host: '0.0.0.0',
    port: 8080
  }
}
