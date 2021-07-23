<template>
    <v-app>
        <Navbar></Navbar>
        <Navigation></Navigation>

          <v-row class=" offset-md-1  mt-3" style="margin-bottom: 0;">
            <v-btn elevation="5" large rounded color="#FFD369" 
             class="black--text" max-width="15%" @click="toggleMainDialog()">
             <v-icon class="ml-1">mdi-plus</v-icon>
              ثبت اطلاعات
            </v-btn>

            
            <MainDialog></MainDialog>
            <SubDialog></SubDialog>          

        </v-row>

    </v-app>
</template>

<script>

import Navbar from '../components/Navbar'
import Navigation from '../components/Navigation'
import MainDialog from '../components/dialogs/MainDialog'
import SubDialog from '../components/dialogs/SubDialog'

export default {
    name: 'Dashboard',
    components: {Navbar, Navigation, MainDialog, SubDialog},

    methods: {
        toggleMainDialog(){
             this.$store.commit("toggleMainDialog", !this.$store.getters.main_dialog)
        }
    }
    
}
</script>
