const config = require('config')
const globalSetting = config.get('setting')
module.exports = {
  router: {
    base: '/taichungbus/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '台中公車動態',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/font-awesome',
    {
      src: 'nuxt-firebase',
      options: {
        apiKey: "AIzaSyAvewTvPj7_DhcTgdY_MePSSq8PFpqO7lk",
        authDomain: "nuxt-a7bf7.firebaseapp.com",
        databaseURL: "https://nuxt-a7bf7.firebaseio.com",
        projectId: "nuxt-a7bf7",
        storageBucket: "nuxt-a7bf7.appspot.com",
        messagingSenderId: "617240776466"
      }
    }
  ],
  env: globalSetting,
  vendor: [
    'axios',
  ],
}
