const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: resolve(__dirname, 'src/frontend/assets/'),
        to: resolve(__dirname, '.webpack/renderer/assets/')
      },
    ]
  })
];
