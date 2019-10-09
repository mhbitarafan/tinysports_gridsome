<template>
  <Layout>
    <v-row
      class="fill-height px-6"
      justify="center"
      align="center"
    >
      <v-col
        cols=12
        xl=9
      >
        <v-row>
          <v-col
            v-for="item in $page.allProducts.edges"
            :key="item.node.id"
            cols=12
            sm=6
            md=4
            lg=3
            xl=2
          >
            <v-card>
              <div class="d-flex flex-column">
                <div class="title pa-3">
                  {{item.node.title}}
                </div>
                <img src="https://via.placeholder.com/150">
                <div class="price pa-2 secondary--text"><span dir="ltr">{{numberWithCommas(item.node.price)}}</span> تومان</div>
              </div>
            </v-card>
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
        title,
        price
      }
    }
  }
}
</page-query>
<script>
import pagination from '../components/pagination'
export default {
    components: {
    'pagination': pagination
  },
  metaInfo: {
    title: "تاینی اسپرت | محصولات"
  }
};
</script>
<style scoped>
.title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>