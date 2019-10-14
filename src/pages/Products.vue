<template>
<layout>
    <v-row class="fill-height px-6" justify="center" align="center">
        <v-col cols="12" xl="9">
                <v-row>
                    <v-col v-for="item in $page.allProducts.edges" :key="item.node.id" cols="12" sm="6" md="4" lg="3" xl="2">
                        <a :href="'/product/'+item.node.id">
                            <v-hover v-slot:default="{ hover }">
                                <v-card :dark="$store.state.dark_mode" :elevation="hover ? 6 : 2">
                                    <div class="d-flex flex-column">
                                        <div class="title px-3 py-1 mt-2" :title="item.node.name">{{item.node.name}}</div>
                                        <div class="title px-3 py-1" :title="item.node.second_name">{{item.node.second_name}}</div>
                                        <div class="image px-1">
                                            <v-img :src="item.node.image" width=200 height=200></v-img>
                                        </div>
                                        <div class="price pa-2">
                                            <span dir="ltr">{{numberWithCommas(item.node.price)}}</span> تومان
                                        </div>
                                    </div>
                                </v-card>
                            </v-hover>

                        </a>
                    </v-col>
                </v-row>
            <pagination :info="$page.allProducts.pageInfo"></pagination>
        </v-col>
    </v-row>
</layout>
</template>

<page-query>
query Products($page: Int){
  allProducts(perPage: 12, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id,
        name,
        second_name,
        price,
        image,
        stock_status
      }
    }
  }
}
</page-query>

<script>
import pagination from "../components/pagination";
export default {
    components: {
        pagination: pagination
    },
    metaInfo: {
        title: "تاینی اسپرت | محصولات",
        link: [{
            rel: 'dns-prefetch',
            href: 'https://tinysports.ir'
        }]
    },
};
</script>

<style scoped>
.title {
    font-family: "yekan-opensans" !important;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 40px;
    font-size: 1.2rem !important;
}

.price {
    font-size: 1.1rem;
}

.image {
    height: 200px;
}

.image img {
    width: 100%;
    height: 200px;
    object-fit: contain;

}
</style>
