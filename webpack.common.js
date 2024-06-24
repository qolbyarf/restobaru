const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin'); // Correctly import InjectManifest

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/', // Ensure publicPath is set correctly
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src/scripts/utils/sw-register.js', // Path to your service worker file
      swDest: 'sw.js',
    }),
  ],
};

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Other Webpack configurations...
    plugins: [
      ...module.exports.plugins,
      isProduction && new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    ].filter(Boolean),
  };
};
