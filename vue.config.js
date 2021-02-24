const webpack = require('webpack');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/farm-stay/'
    : '/',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = '來到農村住一晚';
        return args;
      });
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
    ],
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/style/common.scss";@import "bootstrap/scss/bootstrap";',
      },
    },
  },
};
