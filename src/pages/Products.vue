<template>
<Layout>
    <v-row class="fill-height px-6" justify="center" align="center">
        <v-col cols="12" xl="9">
            <v-row>
                <v-col v-for="item in $page.allProducts.edges" :key="item.node.id" cols="12" sm="6" md="4" lg="3" xl="2">
                    <a :href="'/product/'+item.node.id">
                    <v-card>
                        <div class="d-flex flex-column">
                            <div class="title px-3 py-1 mt-2">{{item.node.name}}</div>
                            <div class="title px-3 py-1">{{item.node.second_name}}</div>
                            <div class="image px-1">
                                <img :src="item.node.image" width=200 height=200 />
                            </div>
                            <div class="price pa-2 secondary--text">
                                <span dir="ltr">{{numberWithCommas(item.node.price)}}</span> تومان
                            </div>
                        </div>
                    </v-card>
                    </a>
                </v-col>
            </v-row>
            <pagination :info="$page.allProducts.pageInfo"></pagination>
        </v-col>
    </v-row>
</Layout>
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
            }
        ]
    }
};
</script>

<style scoped>
.title {
    font-family: byekan !important;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 40px;
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
