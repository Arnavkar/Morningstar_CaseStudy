const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV==="production"?"Morningstar_CaseStudy":"/",
  css: {
    loaderOptions: {
      sass: {
          sourceMap: true,
          additionalData: `$mds-font-asset-path: "~@mds/fonts/src/";`,
      },
    }
  }
})
