<template>
    <v-app-bar app flat>
        <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
        <v-app-bar-title>نرم افزار حسابداری اطلس آذین </v-app-bar-title>
        <v-btn @click="signOut()" left absolute max-width="50px" color="#FFD369" class="black--text">خروج</v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        toggleDrawer(){
            this.$store.commit("toggleDrawer", !this.$store.getters.drawer)
        },
         signOut(){
            this.$store.dispatch('signOut')
        }
    }
}
</script>

<style>
.v-app-bar-title__placeholder, .v-app-bar-title__content {
    overflow: initial !important;
}

.v-application .text-h6 {
    font-family: 'Yekan' !important;
}
.v-list-item-group .v-list-item--active {
    color: aliceblue !important;
}

</style>