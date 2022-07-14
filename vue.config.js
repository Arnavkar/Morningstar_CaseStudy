const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
          sourceMap: true,
          additionalData: `$mds-font-asset-path: "~@mds/fonts/src/";`,
      },
    }
  }
})
