<template>
<layout v-infinite-scroll="loadMore">
    <v-row class="px-6" justify="center">
        <v-col cols="12">
            <v-row>
                <v-col v-for="(item, index) in $page.allProduct.edges" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
                    <g-link :to="'/product/'+item.node.id">
                        <v-hover v-slot:default="{ hover }">
                            <v-card :dark="$store.state.dark_mode" :elevation="hover ? 6 : 2">
                                <div class="d-flex flex-column">
                                    <div class="image white">
                                        <v-img class="mx-auto pa-1" :src="item.node.image" width=200 height=200></v-img>
                                    </div>
                                    <div class="title px-3 py-1 mt-2" :title="item.node.name">{{item.node.name}}</div>
                                    <div class="title px-3 py-1 text-right" dir="ltr" :title="item.node.second_name">{{item.node.second_name}}</div>
                                    <div class="price pa-2">
                                        <span dir="ltr">{{numberWithCommas(item.node.price)}}</span> تومان
                                    </div>
                                </div>
                            </v-card>
                        </v-hover>
                    </g-link>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</layout>
</template>

<page-query>
query Products($page: Int){
  allProduct(perPage: 24, page: $page) @paginate {
    totalCount  
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
export default {
    metaInfo: {
        title: "تاینی اسپرت | محصولات",
        link: [{
            rel: 'dns-prefetch',
            href: 'https://tinysports.ir'
        }]
    },
    methods: {
        loadMore() {
            const totalPages = this.$page.allProduct.pageInfo.totalPages;
            const {
                page
            } = this.$route.params;
            if (page >= totalPages) return;
            if (page) {
                const nextPage = parseInt(page) + 1 ;
                this.$router.push(`${nextPage}`)
            } else {
                this.$router.push(`/products/2`)
            }
        }
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

.scroller {
    height: 100%;
    width: 100%;
}

.user {
    height: 100%;
    padding: 0 12px;
    display: flex;
    align-items: center;
}
</style>
