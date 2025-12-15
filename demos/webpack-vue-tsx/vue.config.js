const { LovinspPlugin } = require('lovinsp');

module.exports = {
  // ...other code
  chainWebpack: (config) => {
    // add this configuration in the development environment
    config.plugin('lovinsp').use(
      LovinspPlugin({
        bundler: 'webpack',
      })
    );
  },
};
