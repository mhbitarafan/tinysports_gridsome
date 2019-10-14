<template>
<v-navigation-drawer :dark="dark_mode" absolute temporary right v-model="$store.state.drawer">
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title>
                تاینی اسپرت
            </v-list-item-title>
            <v-list-item-subtitle class="mt-3">
                فروشگاه لوازم ورزشی
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

    <v-expansion-panels accordion focusable>
        <v-expansion-panel v-for="(category,i) in categories" :key="i">
            <v-expansion-panel-header>{{category.title}}</v-expansion-panel-header>
            <v-expansion-panel-content class="pa-0">
                <div class="pa-0">
                    <div v-for="(subcat, index) in category.subcats" :key="index">
                        <v-btn tile block depressed :to="'/category/'+subcat.link" class="btn-link text-right justify-start pa-6">{{subcat.title}}</v-btn>
                    </div>
                </div>

            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-list nav class="mt-2">
        <v-list-item>
            <v-switch :input-value="dark_mode" label="پوسته سیاه" color="primary" class="mt-1" @change="toggle_darkmode"></v-switch>
        </v-list-item>
    </v-list>
</v-navigation-drawer>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            categories: [{
                    title: 'پینگ پنگ',
                    subcats: [{
                            title: 'چوب پینگ پنگ کورنلیو',
                            link: 'cornilleau-blades'
                        },
                        {
                            title: 'چوب پینگ پنگ باترفلای',
                            link: 'butterfly-blades'
                        }
                    ]
                },
                {
                    title: 'بدمینتون'
                }
            ],
        }
    },
    methods: {
        toggle_darkmode() {
            const is_dark_mode = this.dark_mode;
            this.$store.commit("toggle_darkmode")
            if (is_dark_mode) {
                this.$cookie.delete("dark_mode");
                this.$emit("lightmode");
            } else {
                this.$cookie.set("dark_mode", true, 30);
                this.$emit("darkmode");
            }
        }
    },
    computed: {
        ...mapState({
            dark_mode: state => state.dark_mode
        })
    },
}
</script>

<style scoped>
.btn-link {
    min-height: inherit;
    font-size: 1rem!important;
}

</style>