require("babel-core/register");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
require("babel-polyfill");

const webpack = require("webpack");

const src  = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

const DEBUG = !process.argv.includes("--release");

const extractCSS = new ExtractTextPlugin("css/style.css");

const plugins = [
  new HtmlWebpackPlugin({
    template: src + "/index.html",
    filename: "index.html"
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": "'" + (process.env.NODE_ENV || (DEBUG ? "development" : "production")) + "'"
  }),
  extractCSS
];

if(!DEBUG){
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: true, warnings: false } }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

module.exports = [
  {
    context: src + "/js",
    entry: "./index.jsx",

    output: {
      path: dist,
      filename: "js/bundle.js"
    },

    devServer: {
      contentBase: "dist"
    },

    devtool: DEBUG ? "cheap-module-eval-source-map" : false,

    module: {
      loaders: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loaders: [
            "react-hot",
            "babel"
          ]
        },
        {
          test: /\.css$/,
          loader: extractCSS.extract("style", "css!postcss")
        }
      ]
    },

    resolve: {
      extensions: ["", ".js", ".css"]
    },

    plugins: plugins,

    postcss: [
      require("autoprefixer")(),
      require("postcss-custom-properties")(),
      require("postcss-nested")()
    ]
  }
];