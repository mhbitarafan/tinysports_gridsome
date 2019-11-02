<template>
<v-bottom-navigation class="bottomNavigation" color="deep-purple lighten-2" fixed :dark="$store.state.dark_mode" grow>
    <v-btn to="/products">
        <span>خانه</span>
        <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn>
        <span>سبد خرید</span>
        <v-icon>mdi-cart</v-icon>
    </v-btn>

    <v-btn>
        <span>حساب کاربری</span>
        <v-icon>mdi-account</v-icon>
    </v-btn>
</v-bottom-navigation>
</template>

<script>
export default {

}
</script>

<style scoped>
.bottomNavigation .v-btn {
    height: 100%!important;
}
</style>