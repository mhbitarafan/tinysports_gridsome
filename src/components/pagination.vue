<template>
  <div class="pagination text-center my-4 pa-2 grey lighten-1">
    <v-pagination
      v-model="page"
      :length="totalPages"
      total-visible=7
      @input="paginate"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: ["info"],
  data() {
    return {
      main_page: '',
      page: 1,
      totalPage: 0
    };
  },
  created() {
    this.page = this.info.currentPage;
    this.totalPages = this.info.totalPages
  },
  updated() {
    this.main_page = this.page;
  },
  methods: {
      paginate(){
          if (this.main_page == this.page) {
            return;
          }
          if (this.page == 1){
              this.$router.push('.');
              return;
          }
          this.$router.push(`/products/${this.page}`)
      }
  },
};
</script>

<style scoped>
.v-pagination__item {
    outline: 0;
}
.pagination {
  border-radius: 4px
}
</style>