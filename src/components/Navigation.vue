<template>
    <v-navigation-drawer app right v-model="toggleDrawer">
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title style="font-size: 1.5rem;" class="d-flex justify-center">
            داشبورد
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

<div style="width: 100%;" class="d-flex justify-center mt-3 mb-3">
                  <v-btn elevation="5" large rounded color="#FFD369" 
             class="black--text" min-width="60%" @click="toggleMainDialog()">
             <v-icon class="ml-1">mdi-plus</v-icon>
              ثبت اطلاعات
            </v-btn>
</div>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          @click="navigate(i)"
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

import router from '../router/index'

export default {
    name: 'Navigation',
    data(){
        return {
          selectedItem: 0,
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
        toggleMainDialog(){
             this.$store.commit("toggleMainDialog", !this.$store.getters.main_dialog)
        },

        navigate(i) {
          switch (i) {
            case 0:
              router.push('/dashboard')
              break
            case 1:
              router.push('/dashboard/accountreview')
              break              
          
            default:
              break
          }
        }
    },
    computed: {
      toggleDrawer: {
      get () { return this.$store.getters.drawer },
      set (v) { return this.$store.commit('toggleDrawer', v) }
      }
    },
    mounted(){
      this.navigate(0)
    }
}
</script>