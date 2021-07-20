const {merge} = require('webpack-merge');
const commonConfig = require('./webapck.common.js');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
}

module.exports = merge(commonConfig, prodConfig);