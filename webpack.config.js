const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const config = {
    mode: isProduction ? 'production' : 'development',
    entry: path.resolve(__filename, '../src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      port: 3000,
      writeToDisk: true,
      open: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|svg|png)$/,
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
            MiniCssExtractPlugin.loader,
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
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/assets/favicon.svg',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets' },
        ],
      }),
    ],
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js',
      ],
    },
  };
  return config;
};
