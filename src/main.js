// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from '~/layouts/Default.vue'
import vuetify from '@/plugins/vuetify'
import '~/assets/sass/main.scss'

export default function (Vue, { head, appOptions }) {
  head.htmlAttrs = { lang: 'fa', dir: 'rtl' }
  appOptions.vuetify = vuetify
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
