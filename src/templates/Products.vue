<template>
<layout>
    <transition name="fade">
        <v-row v-if="page_created" class="fill-height px-0 px-md-4" justify="center" align="start" ref="product">
            <v-col cols="12" xl="9" class="py-0 py-md-4 fill-height">

                <!-- titles and price -->

                <!-- desktop -->
                <template v-if="$resize && $mq.above(992)">
                    <v-card tile class="px-3 titles elevation-0">
                        <v-row justify="space-between">
                            <v-col class="title-1">
                                {{$page.products.name}}
                            </v-col>
                            <v-col class="text-center primary--text text--darken-1">
                                <span dir="ltr">{{numberWithCommas($page.products.price)}}</span>
                                <span> تومان</span>
                            </v-col>
                            <v-col class="text-left title-2">
                                {{$page.products.second_name}}
                            </v-col>
                        </v-row>
                    </v-card>
                </template>
                <!-- desktop -->

                <!-- mobile and tablet -->
                <template v-else>
                    <v-card tile class="px-3 titles elevation-0">
                        <div class="d-flex flex-column">
                            <div class="text-center pa-2 mt-2">
                                {{$page.products.name}}
                            </div>
                            <div class="text-left title-2 text-center pa-2">
                                {{$page.products.second_name}}
                            </div>
                        </div>
                    </v-card>
                </template>
                <!-- mobile and tablet -->
                <!-- titles and price -->

                <v-alert v-show="shw_alert" transition="fade-transition" class="mt-4 blue--text text--darken-3" color="info">"یک عدد {{$page.products.name}} به سبد خرید شما افزوده شد." <v-btn color="white" class="mx-2 blue--text text--darken-3 elevation-0" @click="cart_btn()">مشاهده سبد خرید</v-btn>
                </v-alert>
                <!-- images and descriptions -->
                <v-card :dark="$store.state.dark_mode" tile class="mt-0 mt-md-3 px-3 fill-height">
                    <v-row>
                        <v-col class="pa-0">
                            <div class="d-flex flex-column">
                                <v-row>
                                    <div class="image pt-4 pr-4">
                                        <v-img :src="$page.products.image" width=200 height=200></v-img>
                                        <!-- <v-rating value="4" dense readonly class="mx-4"></v-rating> -->
                                    </div>
                                    <v-col>
                                        <div class="d-flex flex-column">
                                            <v-col v-if="$page.products.short_description" v-html="$page.products.short_description"></v-col>
                                            <div class="pa-2 price">
                                                <span>قیمت برای شما: </span>
                                                <span dir="ltr">{{numberWithCommas($page.products.price)}}</span>
                                                <span> تومان</span>
                                            </div>
                                            <div class="px-2">
                                                <v-btn class="mt-3" color="green" dark @click="add_to_cart()">افزودن به سبد خرید</v-btn>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>

                                <v-col class="mt-6 pa-0">
                                    <div v-if="$page.products.attributes" class="alert-title">مشخصات فنی</div>
                                    <v-simple-table v-if="$page.products.attributes">
                                        <template v-slot:default>
                                            <tbody>
                                                <tr v-for="(attr, index) in attrs" :key="index">
                                                    <td>{{ attr.name }}</td>
                                                    <td><span v-for="(option, index) in attr.options" :key="index">{{option}} </span></td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                                <div v-if="$page.products.description" class="mt-6 alert-title">توضیحات</div>
                                <v-col v-if="$page.products.description" v-html="$page.products.description"></v-col>
                            </div>
                        </v-col>

                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </transition>
</layout>
</template>

<page-query>
query Product($id: ID!) {
  products(id: $id) {
    id,
    name,
    second_name,
    price,
    image,
    attributes,
    short_description,
    description,
    stock_status
  }
}
</page-query>

<script>
export default {
    data() {
        return {
            attrs: '',
            shw_alert: false,
            page_created: false,
        }
    },
    created() {
        this.attrs = this.$page.products.attributes;
        if (this.attrs != '') {
            this.attrs = JSON.parse(this.attrs);
        }
    },
    mounted() {
        this.page_created = true;
    },
    methods: {
        async add_to_cart() {
            const id = this.$page.products.id;
            const response = await this.$http.post(`${this.baseUrl}/api/add_to_cart/${id}`);
            const add_cart_stat = response.data;
            if (add_cart_stat == 'success') {
                this.shw_alert = true;
            }
        },
    },
}
</script>

<style scoped>
.titles {
    background: #dfdeff;
    color: #7a49e2;
    font-size: 1.275rem;
    cursor: context-menu;
}

.price {
    font-family: byekan, sans-serif;
    font-size: 1.2rem;
}

.title-1,
.title-2 {
    font-family: yekan-opensans, sans-serif;
}

.alert-title {
    text-align: right;
    font-size: 1.05rem;
    color: #7a49e2;
    cursor: context-menu;
    background: #dfdeff;
    padding: .675rem;
    border-top: 2px solid #7a49e2;
}

.image img {
    height: 200px;
    width: 200px;
    object-fit: contain
}

/* .addtocart {
    background: #DA4453;
    background: -webkit-linear-gradient(to right, #89216B, #DA4453);
    background: linear-gradient(to right, #89216B, #DA4453);
} */
</style>
