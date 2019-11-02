import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    is_auth: false,
    username: "",
    drawer: null,
    drawer_col: null,
    shw_drawer_col: true,
    dark_mode: false,
    jwt_token: "",
    search_term: "",
    snackbar_status: false,
    snackbar_text: "",
    snackbar_color: null,
    qsearch_results: []
  },
  mutations: {
    set_is_auth(state, status) {
      state.is_auth = status;
    },
    set_username(state, username) {
      state.username = username;
    },
    toggle_drawer(state, mq) {
      state.drawer = !state.drawer;
      // state.drawer_col = mq == 'lg' ? (state.drawer_col == 11 ? 10 : 11) : (state.drawer_col = 11)
      state.shw_drawer_col = state.drawer == true ? true : false;
    },
    drawer_col_set(state, value) {
      state.drawer_col = value;
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
    },
    search_term_set(state, term) {
      state.search_term = term;
    },
    qsearch_results_set(state, results) {
      state.qsearch_results = results;
    },
    snackbar_status_set(state, status) {
      state.snackbar_status = status;
    },
    snackbar_set(state, options) {
      state.snackbar_text = options.text;
      state.snackbar_color = options.color;
    }
  },
  actions: {}
});
