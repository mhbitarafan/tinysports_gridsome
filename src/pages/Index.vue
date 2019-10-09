<template>
  <Layout>
    <v-row
      class="fill-height"
      justify="center"
      align="start"
    >
      <v-col
        cols=12
        xl=9
      >
        <v-card class="pa-3">
          <div
            v-for="item in $page.allOrder.edges"
            :key="item.node.id"
          >
            {{item.node.phone}}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query Orders{
  allOrder {
    edges {
      node {
        phone
      }
    }
  }
}
</page-query>
<script>
export default {
  metaInfo: {
    title: "تاینی اسپرت"
  }
};
</script>
