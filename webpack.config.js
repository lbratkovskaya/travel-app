const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
  entry: path.resolve(__filename, '../src/index.tsx'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3000,
    writeToDisk: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader?limit=100000'],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.svg$/,
        use: 'url-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin('./src/assets/favicon.svg'),
  ],
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ],
  },
};

module.exports = config;
