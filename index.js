module.exports = api => {
  api.chainWebpack(webpackConfig => {
    // Remove any existing rule added from a previous version of the plugin (npm uninstall/ yarn remove will remove the plugin, but leave behind the webpack rules)
    webpackConfig.module.rules.delete('slm')

    // Rules taken from: https://vue-loader.vuejs.org/guide/pre-processors.html#slm
    webpackConfig.module
      .rule('slm')
        .test(/\.slm$/)

        // this applies to <template lang="slm"> in Vue components
        .oneOf('vue-loader')
          .resourceQuery(/^\?vue/)
          .use('slm-plain')
            .loader('slm-loader')
            .end()
        .end()

        // this applies to slm imports inside JavaScript, i.e. .slm files
        .oneOf('raw-slm-files')
          .use('slm-raw')
            .loader('raw-loader')
            .end()
          .use('slm-plain')
            .loader('slm-loader')
            .end()
        .end()
  })
}
