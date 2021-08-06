<template>
    <v-dialog v-model="togglePettyCashDialog" scrollable max-width="60%" content-class="custom_background">
            <div class="d-block">   
                   <div class="d-block">   
                    <span class="ml-6 mr-3" @click="close_dialog()" role="button"><v-icon>mdi-arrow-right</v-icon></span>
                    <span style="font-size: 1.5rem;">{{ sub_dialog_title }}</span>
                    </div>

            </div>
            </v-dialog>
</template>

<script>
export default {
    data(){
        return {
    
        }
    },
    methods: {
            close_dialog() {
            this.togglePettyCashDialog = false
            this.$store.commit('toggleMainDialog', true)
            },
    },
    computed: {
        togglePettyCashDialog: {
             get () { return this.$store.getters.petty_cash_dialog },
             set (v) { return this.$store.commit('togglePettyCashDialog', v) }
        },
        sub_dialog_title: {
                     get() { return this.$store.getters.sub_dialog_title},
                     set() { return}
        },
    }
}
</script>