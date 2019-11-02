<template>
<v-app>
    <vue-progress-bar></vue-progress-bar>
    <tsHeader></tsHeader>

    <main class="fill-height pb-7 pb-md-4 pt-md-12 mt-9 mt-md-3" :class="main_classes">
        <v-row justify="center" class="fill-height">
            <template v-if="$store.state.shw_drawer_col">
                <div style="flex:1;max-width:256px;z-index:6">
                    <navigationDrawer />
                </div>
            </template>
            <v-col v-if="$store.state.shw_drawer_col && $mq == 'lg'">
                <slot />
            </v-col>
            <v-col v-else cols="12">
                <slot />
            </v-col>
        </v-row>
    </main>

    <v-snackbar :value="$store.state.snackbar_status" :color="$store.state.snackbar_color" right>
        {{ $store.state.snackbar_text }}
        <v-btn text @click="$store.commit('snackbar_status_set', false)">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
    <template v-if="$mq != 'lg'">
        <bottomNavigations></bottomNavigations>
    </template>

</v-app>
</template>

<script>
import bottomNavigations from "../components/bottomNavigations"
import tsHeader from "../components/tsHeader"
import navigationDrawer from "../components/navigationDrawer"
export default {
    components: {
        bottomNavigations: bottomNavigations,
        tsHeader: tsHeader,
        navigationDrawer: navigationDrawer
    },
    computed: {
        main_classes() {
            return [
                'grey', (this.$store.state.dark_mode ? 'darken-2' : 'lighten-3')
            ]
        },
    },
    mounted() {
        (this.$cookies.get("dark_mode")) ? this.$store.commit("enable_darkmode"): this.$store.commit("disable_darkmode");
        // this.$mq == 'lg' ? (this.$store.state.drawer_col == null ? this.$store.commit("drawer_col_set", 10) : null) : this.$store.commit("drawer_col_set", 12)
        this.$Progress.finish()
    },
    created() {
        this.$Progress.start()
        this.on_create();
        this.$router.afterEach((to, from) => {
            this.$Progress.finish()
        })
    },
    updated() {
        this.on_create()
    },
    methods: {
        loadMore() {
                console.log("HI")
            },
        async is_authenticated() {
            var token_expire = this.$cookies.get("token_expiration");
            if (token_expire) {
                var today = new Date().getTime();
                var dayDiff = Math.floor((token_expire - today) / 86400000);
                if (dayDiff <= 1 && dayDiff >= 0) {
                    this.$http({
                            method: "post",
                            url: "http://localhost/laravel/api/token",
                            headers: {
                                Authorization: "bearer " + this.$store.state.jwt_token
                            }
                        })
                        .then(res => {
                            const jwt_token = res.data.access_token;
                            this.$cookies.set("jwt_token", this.$store.state.jwt_token, "7d");
                        })
                        .catch(error => {
                            this.$store.commit("set_is_auth", false);
                        });
                }
            }
            const jwt_token = this.$cookies.get("jwt_token");
            if (jwt_token) {
                this.$store.commit("jwt_token_set", jwt_token);
                // validate token
                try {
                    const response = await this.$http({
                        method: "get",
                        url: "http://localhost/laravel/api/me",
                        headers: {
                            Authorization: "bearer " + this.$store.state.jwt_token
                        }
                    });
                    this.$store.commit("set_is_auth", true);
                    this.$store.commit("set_username", response.data.name);
                    return true;
                } catch (error) {
                    this.$store.commit("set_is_auth", false);
                    return false;
                }
            } else {
                this.$store.commit("set_is_auth", false);
                return false;
            }
        },
        on_create() {
            this.is_authenticated()
                .then(res => {
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
                .catch(err => {});
        }
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
</style>
