<template>
    <v-navigation-drawer app right v-model="toggleDrawer">
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
</template>

<script>
export default {
    name: 'Navigation',
    data(){
        return {
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
    computed: {
      toggleDrawer: {
      get () { return this.$store.getters.drawer },
      set (v) { return this.$store.commit('toggleDrawer', v) }
    }
    }
}
</script>