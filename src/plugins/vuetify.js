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
            primary: '#9157ff',
            secondary: '#e91e63',
            accent: '#eee8ff',
            info: '#b6e3ff'
            }, 
        },
      },
}

export default new Vuetify(opts)