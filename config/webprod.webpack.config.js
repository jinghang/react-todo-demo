const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, '..'),

  node: {
    __dirname: true
  },

  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom'],
    style: [
      './web/src/style/main.scss'
    ],
    components: [
      './web/src/App.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, '../bundle'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/bundle/',
    sourceMapFilename: 'map/[file].map'
  },

  module: {
    rules: [
      { // js|jsx rules
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react'],
              plugins: [['import', { libraryName: 'antd', style: 'css' }]]
            }
          }
        ]
      }, // end of js|jsx rules

      { // css rules
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('precss'),
                  require('autoprefixer')
                ]
              }
            }
          },
          'sass-loader'
        ]
      }, // end of scss|sass rules

      { // css rules
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('precss'),
                  require('autoprefixer')
                ]
              }
            }
          }
        ]
      }, // end of css rules

      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }, // end of module

  resolve: {
    extensions: ['.js', 'jsx']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        __DEVELOPMENT__: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug:false
    })
  ] // end of plugins
}
