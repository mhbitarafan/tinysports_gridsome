import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)  

const opts = {
    rtl: true,
    icons: {
        iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
      },
      theme: {
        themes: {
          light:{
            primary: '#673ab7',
            secondary: '#e91e63',
            accent: '#9c27b0',
            }, 
        },
      },
}

export default new Vuetify(opts)