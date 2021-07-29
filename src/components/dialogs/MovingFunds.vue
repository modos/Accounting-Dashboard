<template>
    <v-dialog v-model="toggleMovingFundsDialog" scrollable max-width="60%" content-class="custom_background">
            <div class="d-block mt-3">   
                   <div class="d-block mt-3">   
                    <span class="ml-6 mr-3" @click="close_dialog()" role="button"><v-icon>mdi-arrow-right</v-icon></span>
                    <span style="font-size: 1.5rem;">{{ sub_dialog_title }}</span>

                    <v-form lazy-validation ref="form" class="pr-16 pl-16 mt-6">
                        <v-text-field label="مبلغ" v-model="amount" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="حساب مبدا" v-model="source_account" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="حساب مقصد" v-model="destination_account" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="توضیحات" v-model="description" style="max-width: 50%" required></v-text-field>

                        <v-btn elevation="5" large rounded color="#FFD369" 
                            class="black--text mb-3 mt-3" max-width="15%" @click="submit()">
                         ثبت
                            </v-btn>
                    </v-form>

            </div>

            </div>
            </v-dialog>
</template>

<script>
export default {
    data(){
        return {
            amount: '',
            source_account: '',
            destination_account: '',
            description: ''
        }
    },
    methods: {
            close_dialog() {
            this.toggleMovingFundsDialog = false
            this.$store.commit('toggleMainDialog', true)
            },

            submit(){
            this.$store.dispatch('submitMovingFunds', {
                    amount: this.amount,
                    description: this.description,
                    source_account: this.source_account,
                    destination_account: this.destination_account

             })
             this.$refs.form.reset()
        }
    },
    computed: {
        toggleMovingFundsDialog: {
             get () { return this.$store.getters.moving_funds_dialog },
             set (v) { return this.$store.commit('toggleMovingFundsDialog', v) }
        },
        sub_dialog_title: {
                     get() { return this.$store.getters.sub_dialog_title},
                     set() { return}
        },
    }
}
</script>