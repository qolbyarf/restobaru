const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    open: true,
    compress: true,
    historyApiFallback: true, // Tambahkan properti ini
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
