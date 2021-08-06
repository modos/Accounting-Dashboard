<template>
    <v-app>
        <router-view></router-view>
        <Navbar></Navbar>
        <Navigation></Navigation>
        <MainDialog></MainDialog>
        <BuyAndPayDialog></BuyAndPayDialog>  
        <NoteDialog></NoteDialog>
        <RecieveAndSellDialog></RecieveAndSellDialog>
        <MovingFundsDialog></MovingFundsDialog>
        <FunctionsDialog></FunctionsDialog>
        <PettyCashDialog></PettyCashDialog>

    </v-app>
</template>

<script>

import Navbar from '../../components/Navbar'
import Navigation from '../../components/Navigation'
import MainDialog from '../../components/dialogs/main_menu/MainDialog'
import BuyAndPayDialog from '../../components/dialogs/main_menu/BuyAndPay'
import NoteDialog from '../../components/dialogs/AddNoteDialog'
import RecieveAndSellDialog from '../../components/dialogs/main_menu/RecieveAndSell'
import MovingFundsDialog from '../../components/dialogs/main_menu/MovingFunds'
import FunctionsDialog from '../../components/dialogs/main_menu/FunctionsDialog'
import PettyCashDialog from '../../components/dialogs/main_menu/PettyCash'
import Notes from '../../components/Notes'
import { getUser } from '../../storage'

export default {
    name: 'Dashboard',
    components: {Navbar, Navigation, MainDialog, BuyAndPayDialog,
                 Notes, NoteDialog, RecieveAndSellDialog, MovingFundsDialog,
                 FunctionsDialog, PettyCashDialog},
    data() {
        return {
            user: {}
        }
    },
    methods: {
        toggleMainDialog(){
             this.$store.commit("toggleMainDialog", !this.$store.getters.main_dialog)
        }
    },
    mounted() {
       this.user = getUser()
    }
    
}
</script>

<style>
    ::-webkit-scrollbar {
        width: 5px;
        margin-left: 10px;

    }

     ::-webkit-scrollbar-track {
       background: #f1f1f1; 
       border-radius: 20px;
     }
      
     ::-webkit-scrollbar-thumb {
       background: #888; 
       border-radius: 5px;
       background-clip: padding-box;
      
     }

     ::-webkit-scrollbar-thumb:hover {
       background: #555; 
     }
</style>