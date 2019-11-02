<template>
<div class="header">
    <v-app-bar :dark="$store.state.dark_mode" fixed>
        <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
        <v-toolbar-title>
            <g-link class="logo pa-2" to="/products">
                {{ $static.metadata.siteName }}
            </g-link>
        </v-toolbar-title>

        <!-- desktop header -->
        <template v-if="$mq == 'lg'">

            <!-- searchbar -->
            <div class="flex-grow-1 m-auto d-flex justify-center">
                <div class="search" v-click-outside="hide_qsearch_list" @click="shw_qsearch_results=1">
                    <input :class="search_classes" type="search" v-model="search_term" placeholder="جستجوی محصولات ..." @input="search()">
                    <v-btn class="search-icon" :class="{search_btn_after_search: shw_qsearch_results}" small depressed color="primary white--text">
                        <v-icon @click="">mdi-magnify</v-icon>
                    </v-btn>
                    <div v-if="shw_qsearch_results" class="qsearch-results elevation-6">
                        <div class="qsearch_items" v-for="(item, index) in $store.state.qsearch_results" :key="index" @click="shw_qsearch_results=0">
                            <g-link class="pa-2" :to="'/product/'+item.id">
                                {{item.name}}
                                <div class="pt-2">{{item.second_name}}</div>
                            </g-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- searchbar -->



            <!-- basket link -->
            <div>
                <v-btn depressed to="/cart" text class="mx-2 primary--text">
                    سبد خرید
                    <v-icon right>mdi-cart</v-icon>
                </v-btn>
            </div>
            <!-- basket link -->

            <!-- auth links -->
            <div v-if="!$store.state.is_auth">
                <g-link class="auth-link mx-2 pa-1" to="/login">ورود</g-link>
                <g-link class="auth-link mx-2 pa-1" to="/register">ثبت نام</g-link>
            </div>

            <!-- profile link -->
            <div v-if="$store.state.is_auth">
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed text v-on="on">
                            {{$store.state.username}}
                            <v-icon class="pb-1" right>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item class="pa-0">
                            <v-btn block tile depressed class="btn-link" to="/dashboard">مدیریت حساب</v-btn>
                        </v-list-item>
                        <v-list-item class="pa-0">
                            <v-btn block tile depressed class="btn-link" @click="logout()">خروج از حساب</v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </template>

        <!-- tablet and mobile header -->
        <template v-else>
            <div class="flex-grow-1"></div>
            <v-icon size="28" @click="open_searchbox()">mdi-magnify</v-icon>

            <!-- searchbar -->
            <div v-if="shw_search_box" class="search-area">
                <input :class="search_classes" class="pa-2" type="search" v-model="search_term" placeholder="جستجوی محصولات ..." @input="search()" v-click-outside="hide_qsearch_list" @click="shw_qsearch_results=1">
                <div class="white pa-1 pa-2 qsearch-results-mobile">
                    <div class="qsearch_items" v-for="(item, index) in $store.state.qsearch_results" :key="index" @click="shw_search_box=0">
                        <g-link class="pa-2" :to="'/product/'+item.id">
                            {{item.name}}
                            <div class="pt-2">{{item.second_name}}</div>
                        </g-link>
                    </div>
                </div>
            </div>
            <!-- searchbar -->
        </template>
        <!-- tablet and mobile header -->
    </v-app-bar>
</div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import ClickOutside from 'vue-click-outside'
export default {
    directives: {
        ClickOutside
    },
    data() {
        return {
            jwt_token: null,
            shw_qsearch_results: false,
            search_term: '',
            shw_search_box: false,
        }
    },
    mounted() {
        this.search_term = this.$store.state.search_term;
    },
    methods: {
        toggleDrawer() {
            this.$store.commit("toggle_drawer", this.$mq);
        },
        open_searchbox() {
            this.shw_search_box = true;
        },
        async search() {
            this.$store.commit("search_term_set", this.search_term)
            if (this.$store.state.search_term.length >= 3) {
                const response = await this.$http.get(`${this.baseUrl}/api/qs/${this.$store.state.search_term}`);
                const body = response.data;
                if (body.length != 0) {
                    this.$store.commit("qsearch_results_set", body.slice(0, 20));

                }
                this.shw_qsearch_results = true;
            } else {
                this.$store.commit("qsearch_results_set", []);
                this.shw_qsearch_results = false;
            }
        },
        hide_qsearch_list() {
            this.shw_qsearch_results && (this.shw_qsearch_results = false)
        },
        async logout() {
            try {
                const response = await this.$http({
                    method: "post",
                    url: `${this.baseUrl}/api/logout`,
                    headers: {
                        Authorization: "bearer " + this.$store.state.jwt_token
                    }
                });
                this.$cookies.remove("jwt_token");
                this.$cookies.remove("token_expiration");
                this.$store.commit("set_is_auth", false);
                this.$store.commit("snackbar_set", {
                    "text": "شما با موفقیت از حساب خود خارج شدید",
                    "color": "success"
                })
            } catch (error) {
                this.$store.commit("snackbar_set", {
                    "text": "خطا، لطفا مجددا تلاش کنید",
                    "color": "error"
                })
            }
            this.$store.commit("snackbar_status_set", true);
            setTimeout(() => {
                this.$store.commit("snackbar_status_set", false);
            }, 6000);
        }
    },
    computed: {
        header_classess() {
            return [
                (this.$store.state.dark_mode ? 'grey darken-3' : 'white')
            ]
        },
        search_classes() {
            return [
                'grey', (this.$store.state.dark_mode ? 'darken-2 elevation-2' : 'lighten-3'),
                (this.shw_qsearch_results ? 'input_after_search' : null)
            ]
        }
    },
}
</script>

<style scoped>
.nav__link {
    margin-left: 20px;
}

.auth-link {
    /* color: white !important; */
    font-size: 1.095rem;
}

.btn-link {
    min-height: inherit;
    font-size: 1.095rem;
}

.logo {
    font-size: 1.095rem;
}

.search {
    position: relative;
    width: 40%;
}

.search input {
    border-radius: 6px;
    width: 100%;
    outline: 0;
    height: 2.5rem;
    padding: 1rem;
}

.search-icon {
    position: absolute;
    left: 0;
    top: 0;
    height: 100% !important;
    border-radius: 6px 0 0 6px;
}

.qsearch-results {
    position: absolute;
    width: 100%;
    border-radius: 0 0 6px 6px;
    top: 101%;
    background: #ffffff;
    z-index: 3;
    max-height: 400px;
    overflow: auto;
}

.qsearch_items a {
    display: block;
    color: black !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.qsearch_items a:hover {
    color: #6635cf !important
}

.qsearch_items:nth-child(even) {
    background-color: rgb(245, 245, 245);
}

.input_after_search {
    border-radius: 6px 6px 0 0 !important;
}

.search_btn_after_search {
    border-radius: 6px 0px 0 0 !important;
}

.search-area {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
}

.search-area input {
    width: 100%;
    flex-basis: 56px;
}

.qsearch-results-mobile {
    overflow: auto;
    flex: 1;
    margin-bottom: 56px;
}

.header {
    z-index: 5;
}

@media screen and (min-width: 1264px){
    .header {
        z-index: 7;
    }
}
</style>

