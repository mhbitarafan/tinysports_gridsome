// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from "~/layouts/Default.vue";
import store from "./store";
import "~/assets/sass/main.scss";
import vuetify from "@/plugins/vuetify";
import axios from "axios";
var cookie = require("vue-cookie");
import { MediaQueries } from "vue-media-queries";

export default function(Vue, { head, appOptions, router }) {
  Vue.prototype.$http = axios;
  const mediaQueries = new MediaQueries();
  Vue.use(cookie);
  Vue.use(mediaQueries);

  head.htmlAttrs = { lang: "fa", dir: "rtl" };
  appOptions.vuetify = vuetify;
  appOptions.store = store;
  appOptions.mediaQueries = mediaQueries;

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  router.beforeEach((to, from, next) => {
    is_authenticated().then(res => {
      if (res === true) {
        switch (to.path) {
          case "/login":
            next("/dashboard");
            break;
          default:
            next();
            break;
        }
      } else {
        switch (to.path) {
          case "/dashboard":
            next("/login");
            break;
          default:
            next();
            break;
        }
      }
    })
  });

  Vue.mixin({
    data() {
      return {
        baseUrl: "http://localhost/laravel"
      };
    },
    methods: {
      numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009,\u202F");
      },
      addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
    }
  });
}

async function is_authenticated() {
  var token_expire = cookie.get("token_expiration");
  if (token_expire) {
    var today = new Date().getTime();
    var dayDiff = Math.floor((token_expire - today) / 86400000);
    if (dayDiff <= 1 && dayDiff >= 0) {
      axios({
        method: "post",
        url: "http://localhost/laravel/api/token",
        headers: {
          Authorization: "bearer " + store.state.jwt_token
        }
      })
        .then(res => {
          const jwt_token = res.data.access_token;
          cookie.set("jwt_token", store.state.jwt_token, 7);
        })
        .catch(error => {
          store.commit("set_is_auth", false);
        });
    }
  }
  const jwt_token = cookie.get("jwt_token");
  if (jwt_token) {
    store.commit("jwt_token_set", jwt_token);
    // validate token
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost/laravel/api/me",
        headers: {
          Authorization: "bearer " + store.state.jwt_token
        }
      });
      store.commit("set_is_auth", true);
      store.commit("set_username", response.data.name);
      return true;
    } catch (error) {
      store.commit("set_is_auth", false);
      return false;
    }
  } else {
    store.commit("set_is_auth", false);
    return false;
  }
}
