<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalPages"
      total-visible=5
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
      page: 1,
      totalPage: 0
    };
  },
  created() {
    this.page = this.info.currentPage;
    this.totalPages = this.info.totalPages
  },
  methods: {
      paginate(){
          if (this.page == 1){
              this.$router.push('.');
              return;
          }
          this.$router.push(`/products/${this.page}`)
      }
  },
};
</script>

<style>
</style>