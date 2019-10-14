<template>
<v-app>
    <div :class="{header: !$store.state.dark_mode}">
        <v-app-bar :dark="dark_theme">
            <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <g-link class="logo pa-2" to="/products">
                    {{ $static.metadata.siteName }}
                </g-link>
            </v-toolbar-title>

            <!-- desktop header -->
            <template v-if="$resize && $mq.above(992)">
                <div class="flex-grow-1 m-auto d-flex justify-center">
                    <div class="search">
                        <input :class="search_classes" type="search" placeholder="جستجوی محصولات ...">
                        <v-btn class="search-icon" small depressed color="primary lighten-1">
                            <v-icon @click="">mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </div>
                <!-- basket link -->
                <div>
                    <v-btn depressed to="/cart" color="#ffb203" class="mx-2 black--text">
                        سبد خرید
                        <v-icon right>mdi-cart</v-icon>
                    </v-btn>
                </div>
                <!-- basket link -->

                <!-- auth links -->
                <div v-if="!$store.state.is_auth">
                    <g-link class="auth-link mx-1 pa-1" to="/login">ورود</g-link>
                    <g-link class="auth-link mx-1 pa-1" to="/register">ثبت نام</g-link>
                </div>

                <!-- profile link -->
                <div v-if="$store.state.is_auth">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn depressed color="grey lighten-3" class="black--text" v-on="on">
                                {{$store.state.username}}
                                <v-icon class="pb-1" right>mdi-chevron-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item class="pa-0">
                                <v-btn block tile depressed class="btn-link" to="/dashboard">مدیریت حساب</v-btn>
                            </v-list-item>
                            <v-list-item class="pa-0">
                                <v-btn block tile depressed class="btn-link" to="/logout">خروج از حساب</v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>

                <!-- tablet and mobile header -->
            </template>
            <template v-else>
                <div class="flex-grow-1"></div>
                <v-icon large @click="">mdi-magnify</v-icon>
            </template>

            <template v-slot:extension>
                <v-btn tile text>
                    <v-icon>mdi-menu</v-icon>
                    دسته بندی کالاها
                </v-btn>
            </template>
        </v-app-bar>
        <navigationDrawer @darkmode="on_dark_mode" @lightmode="on_light_mode" />
    </div>
    <main class="fill-height" :class="main_classes">
        <slot />
    </main>
    <v-footer dark>
        <span>Tinysports © 2019</span>
        <div class="flex-grow-1"></div>
        <span>
            Made with <v-icon color="red" small>mdi-heart</v-icon> by mhbitarafan
        </span>
    </v-footer>
</v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import navigationDrawer from "../components/navigationDrawer";
export default {
    components: {
        navigationDrawer: navigationDrawer
    },
    metaInfo: {},
    data() {
        return {
            jwt_token: '',
            dark_theme: null,
            currentItem: 'tab-Web',
            items: [
                'Web', 'Shopping', 'Videos', 'Images',
            ],
            more: [
                'News', 'Maps', 'Books', 'Flights', 'Apps',
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
    methods: {
        toggleDrawer() {
            this.$store.commit("toggle_drawer");
        },
        on_dark_mode() {
            this.dark_theme = true;
        },
        on_light_mode() {
            this.dark_theme = false;
        }
    },
    computed: {
        header_classess() {
            return [
                (this.dark_theme ? 'grey darken-3' : 'white')
            ]
        },
        main_classes() {
            return [
                'grey', (this.dark_theme ? 'darken-2' : 'lighten-3')
            ]
        },
        search_classes() {
            return [
                'grey', (this.dark_theme ? 'darken-2 elevation-2' : 'lighten-3')
            ]
        }
    },
    mounted() {
        const dark_mode_cookie = this.$cookie.get("dark_mode");
        (dark_mode_cookie) ? this.$store.commit("enable_darkmode"): this.$store.commit("disable_darkmode");
        this.$store.state.dark_mode && this.on_dark_mode()
    },
};
</script>

<style scoped>
@font-face {
    font-family: byekan;
    src: url("../assets/BYekan_PersianNumbers.woff2");
    font-weight: normal;
}

@font-face {
    font-family: "yekan-opensans";
    src: url("../assets/OpenSans-yekan.woff2");
    font-weight: normal;
}

body {
    font-family: byekan, yekanumber, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.5;
}

.layout {
    max-width: 760px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
}

.header {
    z-index: 1 !important;
}

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
    height: 2.3rem;
    padding: 1rem;
}

.search-icon {
    position: absolute;
    left: 0;
    top: 0;
    height: 100% !important;
    border-radius: 6px 0 0 6px;
}
</style>
