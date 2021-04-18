module.exports = {
  transpileDependencies: ['wave-ui'], // ! \\
  // You don't need this part if you haven't done step 2.
  // ----------------------------------------------------
  css: {
    loaderOptions: {
      // `additionalData` was called `prependData` prior sass-loader 9.
      sass: { additionalData: '@import "@/scss/_variables.scss";' },
    },
  },
  // ----------------------------------------------------
  publicPath: '/vuescrollwithrouter/',
  productionSourceMap: true,
}
