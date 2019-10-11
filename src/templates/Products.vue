<template>
<layout>
    <v-row class="fill-height px-6" justify="center" align="start">
        <v-col cols="12" xl="9">
            <v-card class="px-3 titles">
                <v-row justify="space-between">
                    <v-col>
                        {{$page.products.name}}
                    </v-col>
                    <v-col class="text-center secondary--text">
                        <span dir="ltr">{{numberWithCommas($page.products.price)}}</span>
                        <span> تومان</span>
                    </v-col>
                    <v-col class="text-left title-2">
                        {{$page.products.second_name}}
                    </v-col>
                </v-row>
            </v-card>

            <v-card class="mt-3 px-3">
                <v-row>
                    <v-col>
                        <div class="d-flex flex-column">
                            <v-row>
                                <div class="image">
                                    <img :src="$page.products.image" width=200 height=200 />
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
                                            <v-btn class="mt-3 addtocart" dark>افزودن به سبد خرید</v-btn>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>

                            <v-col class="mt-6 pa-0">
                                <div v-if="$page.products.attributes" class="alert-title">مشخصات فنی</div>
                                <v-simple-table v-if="$page.products.attributes" class="grey lighten-5">
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
</layout>
</template>

<script>
export default {
    data() {
        return {
            attrs: '',
            t: ''
        }
    },
    created() {
        this.attrs = this.$page.products.attributes;
        this.attrs = JSON.parse(this.attrs);
    },
}
</script>

<page-query>
query Product($id: ID!) {
  products(id: $id) {
    name
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

<style scoped>
.titles {
    font-size: 1.5rem;
    cursor: context-menu;
}

.price {
    font-size: 1.2rem;
}

.title-2 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}
.alert-title{
    /* width: 140px; */
    text-align: center;
    color: rgb(110, 29, 110);
    border: 1px solid rgb(239, 218, 255);
    border-top: 3px solid rgb(87, 0, 128);
    cursor: context-menu;
    background: #f4e7fb;
    /* border-radius: .275rem; */
    padding: .675rem;
    margin-bottom: .875rem;
}
.image img {
    height: 200px;
    width: 200px;
    object-fit: contain
}

.addtocart {
    background: #DA4453;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #89216B, #DA4453);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #89216B, #DA4453);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
