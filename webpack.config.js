var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:8080/",
      "./src/app.js"
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].js'
  },
  resolve: {
    alias: {
      src: "./src",
      application: "./application",
      scss: "./scss",
      'fonts': path.resolve(__dirname, './src/fonts'),
      'views': path.resolve(__dirname, './src/views'),
      'models': path.resolve(__dirname, './src/models'),
      'shaders': path.resolve(__dirname, './src/shaders'),
      'sounds': path.resolve(__dirname, './src/sounds'),
      'textures': path.resolve(__dirname, './src/textures'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
      },
      { test: /\.(jpe?g|png|gif)$/i, loader:"file-loader" },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/fonts/', to: 'assets/fonts/'},
      {from: 'src/models/', to: 'assets/models/'},
      {from: 'src/sounds/', to: 'assets/sounds/'},
      {from: 'src/textures/', to: 'assets/textures/'},
    ]),
    new HtmlWebpackPlugin({
      title: "Test Space",
      inject: true,
      hash: true,
      template: "./src/index.ejs",
      chunksSortMode: 'dependency'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      jquery: "jquery",
      'THREE': 'three'
    }),
    new webpack.DefinePlugin({
      Tether: "tether",
      "window.Tether": "tether"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    overlay: {
      warnings: false,
      errors: true
    },
    compress: true,
    hot: true,
    inline: true,
    open: true
  },
  devtool: "#eval-source-map"
};