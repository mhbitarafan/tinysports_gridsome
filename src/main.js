// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from "~/layouts/Default.vue";
import store from "./store";
import "~/assets/sass/main.scss";
import vuetify from "@/plugins/vuetify";
import axios from "axios";
import VueMq from "vue-mq";
import VueCookies from "vue-cookies";
import VueProgressBar from "vue-progressbar";
import infiniteScroll from 'vue-infinite-scroll'

export default function(Vue, { head, appOptions, router }) {
  Vue.prototype.$http = axios;

  Vue.use(VueMq, {
    breakpoints: {
      // default breakpoints - customize this
      sm: 450,
      md: 1250,
      lg: Infinity
    },
    defaultBreakpoint: "sm" // customize this for SSR
  });
  Vue.use(VueCookies);

  const options = {
    color: "#aa7dff",
    failedColor: "#cc0c0c",
    thickness: "3px",
    transition: {
      speed: "0.2s",
      opacity: "0.6s",
      termination: 300
    },
    autoRevert: true,
    location: "top",
    inverse: false
  };

  Vue.use(VueProgressBar, options);
  Vue.use(infiniteScroll)

  head.htmlAttrs = { lang: "fa", dir: "rtl" };
  appOptions.vuetify = vuetify;
  appOptions.store = store;

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  // router.beforeEach((to, from, next) => {
  // console.log("Hi")
  //  start the progress bar
  // Vue.prototype.$Progress.start();
  // is_authenticated()
  //   .then(res => {
  //     if (res === true) {
  //       switch (to.path) {
  //         case "/login":
  //           next("/dashboard");
  //           break;
  //         default:
  //           next();
  //           break;
  //       }
  //     } else {
  //       switch (to.path) {
  //         case "/dashboard":
  //           next("/login");
  //           break;
  //         default:
  //           next();
  //           break;
  //       }
  //     }
  //   })
  //   .catch(err => {});
  // });

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
      },
      ScrolledToBottom() {
          var d = document.documentElement;
          var offset = d.scrollTop + window.innerHeight;
          var height = d.offsetHeight;
          if (offset === height) {
            return true;
        };
      }
    }
  });
}

// async function is_authenticated() {
//   var token_expire = VueCookies.get("token_expiration");
//   if (token_expire) {
//     var today = new Date().getTime();
//     var dayDiff = Math.floor((token_expire - today) / 86400000);
//     if (dayDiff <= 1 && dayDiff >= 0) {
//       axios({
//         method: "post",
//         url: "http://localhost/laravel/api/token",
//         headers: {
//           Authorization: "bearer " + store.state.jwt_token
//         }
//       })
//         .then(res => {
//           const jwt_token = res.data.access_token;
//           VueCookies.set("jwt_token", store.state.jwt_token, "7d");
//         })
//         .catch(error => {
//           store.commit("set_is_auth", false);
//         });
//     }
//   }
//   const jwt_token = VueCookies.get("jwt_token");
//   if (jwt_token) {
//     store.commit("jwt_token_set", jwt_token);
//     // validate token
//     try {
//       const response = await axios({
//         method: "get",
//         url: "http://localhost/laravel/api/me",
//         headers: {
//           Authorization: "bearer " + store.state.jwt_token
//         }
//       });
//       store.commit("set_is_auth", true);
//       store.commit("set_username", response.data.name);
//       return true;
//     } catch (error) {
//       store.commit("set_is_auth", false);
//       return false;
//     }
//   } else {
//     store.commit("set_is_auth", false);
//     return false;
//   }
// }
