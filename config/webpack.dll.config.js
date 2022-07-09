const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'react',
    'react-dom',
    'react-router-dom',
    'echarts',
    'echarts-wordcloud',
    'markdown-navbar',
    'react-markdown',
    'antd',
    '@toast-ui/editor',
  ],
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../vendor/dll'),
    library: 'vendor_[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../vendor/dll', '[name].manifest.json'),
      name: 'vendor_[name]_[hash]',
    }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: 'entries',
    }),
  ],
  mode: 'production',
};
