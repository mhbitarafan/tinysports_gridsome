<template>
<v-navigation-drawer :dark="dark_mode" fixed right floating v-model="$store.state.drawer">

    <div class="d-flex flex-column fill-height justify-space-between">
        <div>
            <v-expansion-panels accordion focusable class="elevation-0 pt-1">
                <v-expansion-panel v-for="(category,i) in categories" :key="i">
                    <v-expansion-panel-header v-if="!category.have_sub" hide-actions class="pa-0">
                        <g-link :to="'/product/category/'+category.link" class="pr-6 py-2">{{category.title}}</g-link>
                    </v-expansion-panel-header>
                    <v-expansion-panel-header v-if="category.have_sub">
                        {{category.title}}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pa-0">
                        <div class="pa-0">
                            <div v-for="(subcat, index) in category.subcats" :key="index">
                                <v-btn tile block depressed :to="'/product/category/'+subcat.link" class="btn-link text-right justify-start pa-6">{{subcat.title}}</v-btn>
                            </div>
                        </div>

                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
        <div>
            <v-chip label :class="phone_number_class" class="py-1 mb-3 mr-3" title="مشاوره رایگان پینگ پنگ">
                <v-icon left>mdi-phone</v-icon>
                <div dir="ltr" style="font-size:1.23rem">0912 20 10 376</div>
            </v-chip>

            <v-list dense class="footer pt-2 text-right">
                <div class="d-flex mr-3 mb-2">
                    <v-switch hide-details dense :input-value="dark_mode" label="حالت شب" color="primary" class="mt-1 mx-1" @change="toggle_darkmode"></v-switch>
                    <v-icon size="26" style="height:40px">mdi-theme-light-dark</v-icon>

                </div>
                <v-list-item class="justify-start pa-0 pr-1 mr-2 my-3" style="font-size:0.845rem;font-family:yekan-opensans;font-weight:bold;letter-spacing: .22rem;min-height:20px">TINYSPORTS©2019</v-list-item>
                <!-- <v-list-item dir="ltr" class="justify-end pa-0 pr-1 mr-2" style="font-size:.75rem;font-weight:500;letter-spacing: .09rem;">Made with <v-icon color="red" size="15" class="mx-1 mb-1">mdi-heart</v-icon> by mhbitarafan</v-list-item> -->
            </v-list>
        </div>
    </div>
</v-navigation-drawer>
</template>

<static-query>
{
  allCategory(sortBy: "menu_order", order: ASC){
    edges{
      node{
          id
        name
        slug
        parent_id,
        menu_order
      }
    }
  }
}
</static-query>

<script>
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            categories: [],
        }
    },
    created() {
        this.$static.allCategory.edges.map(cat => {
            if (cat.node.parent_id == null) {
                this.categories.push({
                    id: cat.node.id,
                    title: cat.node.name,
                    link: cat.node.slug,
                    subcats: []
                });
            }
        });

        // this.categories.map((parent, index) => {
        //     this.categories[index].subcats = [];
        // });

        this.$static.allCategory.edges.map(cat => {
            this.categories.map((parent, index) => {
                try {
                    if (cat.node.parent_id == parent.id && parent.id != undefined) {
                        this.categories[index].subcats.push({
                            title: cat.node.name,
                            link: cat.node.slug
                        });
                        this.categories[index].have_sub = true;
                    }
                } catch (error) {
                    this.categories[index].have_sub = true;
                }
            })
            // this.categories.map((parent, index) => {
            //     try {
            //         if (cat.node.parent_id == parent.id) {
            //             this.categories[index].subcats.push({
            //                 title: cat.node.name,
            //                 link: cat.node.slug
            //             })
            //         }
            //     } catch (error) {}
            // })
        });

    },
    methods: {
        toggle_darkmode() {
            const is_dark_mode = this.dark_mode;
            this.$store.commit("toggle_darkmode")
            if (is_dark_mode) {
                this.$cookies.remove("dark_mode");
                this.$emit("lightmode");
            } else {
                this.$cookies.set("dark_mode", true, "30d");
                this.$emit("darkmode");
            }
        }
    },
    computed: {
        ...mapState({
            dark_mode: state => state.dark_mode
        }),
        phone_number_class() {
            return [
                'grey', (this.$store.state.dark_mode ? 'darken-1 white--text' : 'lighten-3')
            ]
        }
    },
}
</script>

<style scoped>
.v-expansion-panel::before {
    box-shadow: none !important;
}

.btn-link {
    min-height: inherit;
    font-size: 1rem !important;
}

.v-navigation-drawer {
    margin-top: 0;
    padding-bottom: 0;
}

.footer {
    border-top: 1px solid rgb(236, 236, 236)
}

@media only screen and (min-width: 1264px) {
    .v-navigation-drawer {
        margin-top: 64px;
        padding-bottom: 60px;
    }
}
</style>
