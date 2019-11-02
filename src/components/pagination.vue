<template>
<div class="pagination text-center my-4 pa-2" :class="page_container_class">
    <v-pagination v-model="page" :length="totalPages" total-visible=7 @input="paginate"></v-pagination>
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
        this.totalPages = this.info.totalPages;
    },
    updated() {
        this.main_page = this.page;
    },
    computed: {
        page_container_class() {
            return [
                (this.$store.state.dark_mode ? 'grey darken-3' : 'white elevation-2')
            ]
        },
    },
    methods: {
        paginate() {
            if (this.main_page == this.page) {
                return;
            }
            if (this.page == 1) {
                this.$router.push('.');
                return;
            }
            var curr_route = this.$router.currentRoute.path;
            var curr_page = this.$router.currentRoute.params.page;
            var to = curr_route.lastIndexOf('/');
            to = to == -1 ? curr_route.length : to + 1;
            if (curr_page == undefined) {
                this.$router.push(`${curr_route}/${this.page}`)
                return;
            }
            curr_route = curr_route.substring(0, to);
            console.log(curr_route)
            this.$router.push(`http://localhost:8080/${curr_route}/${this.page}`);
        }
    },
};
</script>

<style>
.v-pagination__item,
.v-pagination__navigation {
    outline: 0 !important;
}

.pagination {
    border-radius: 4px
}
</style>
