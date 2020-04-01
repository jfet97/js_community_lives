// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'JavaScript ITA Community Lives',
  siteDescription: 'Aggregator for all the lives distributed for free by our community',
  plugins: [{
    use: 'gridsome-source-google-sheets',
    options: {
      sheetId: process.env.GOOGLE_SHEET_ID,
      apiKey: process.env.GOOGLE_API_KEY,
    }
  },
  {
    use: 'gridsome-plugin-tailwindcss',
  }],
  templates: {
    googleSheet: [
      {
        path: '/lives/:id',
        component: './src/templates/googleSheet.vue'
      }
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
