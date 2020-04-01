// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import MainPageLayout from '~/layouts/MainPageLayout.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('MainPageLayout', MainPageLayout)

  head.link.push({
    rel: 'stylesheet',
    href: `https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,700;1,400;1,900&display=swap`
  })
}
