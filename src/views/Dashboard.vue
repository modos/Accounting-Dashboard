<template>
    <v-app>
        <v-app-bar flat dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>نرم افزار حسابداری اطلس آذین </v-app-bar-title>
        <v-btn @click="signOut()" left absolute max-width="50px" color="yellow" class="black--text">خروج</v-btn>
    </v-app-bar>
    <v-navigation-drawer clipped app right dark  v-model="drawer">
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title style="font-size: 1.5rem;" class="d-flex justify-center">
            داشبورد
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          co
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>
    </v-app>
</template>

<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            drawer: true,
            selectedItem: 1,
            menu: [
                { text: 'خانه', icon: 'mdi-home' },
                { text: 'مرور حساب ها', icon: 'mdi-account' },
                { text: 'گزارش مانده حساب ها', icon: 'mdi-flag' },
                { text: 'قیمت تمام شده', icon: 'mdi-clock' },
                { text: 'مرور چک ها', icon: 'mdi-account-check' },
                { text: 'گزارش تنخواه', icon: 'mdi-basket' },
                { text: 'گزارش سود و زیان', icon: 'mdi-artstation' },
      ],
        }
    },
    
    methods: {
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
