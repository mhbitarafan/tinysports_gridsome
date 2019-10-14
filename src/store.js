import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    is_auth: false,
    username: "",
    drawer: null,
    dark_mode: false,
    jwt_token: ''
  },
  mutations: {
    set_is_auth(state, status) {
      state.is_auth = status;
    },
    set_username(state, username) {
      state.username = username;
    },
    toggle_drawer(state) {
      state.drawer = !state.drawer;
    },
    toggle_darkmode(state) {
      state.dark_mode = !state.dark_mode;
    },
    enable_darkmode(state) {
      state.dark_mode = true;
    },
    disable_darkmode(state) {
      state.dark_mode = false;
    },
    jwt_token_set(state, token) {
      state.jwt_token = token;
    }
  },
  actions: {}
});
