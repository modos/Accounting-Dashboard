<template>

          <v-dialog v-model="toggleBuyAndPayDialog" scrollable max-width="60%" content-class="custom_background">
            <div class="d-block mt-3">   
                    <span class="ml-6 mr-3" @click="close_dialog()" role="button"><v-icon>mdi-arrow-right</v-icon></span>
                    <span style="font-size: 1.5rem;">{{ sub_dialog_title }}</span>

                    <v-form lazy-validation ref="form" class="pr-16 pl-16 mt-6">
                        <v-text-field label="مبلغ" v-model="amount" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="شرح پرداخت" v-model="description" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="طرف حساب" v-model="account_side" style="max-width: 50%" required></v-text-field>

                        <v-select
                                :items="items"
                                 label="پرداخت بابت چه چیزی بوده است؟"
                                 v-model="type"
                                 style="max-width: 50%;"
                        ></v-select>

                        <v-btn elevation="5" large rounded color="#FFD369" 
                            class="black--text mb-3 mt-3" max-width="15%" @click="submit()">
                         ثبت
                            </v-btn>
                    </v-form>

            </div>
            </v-dialog>
     
</template>

<script>
export default {
    name: 'BuyAndPayDialog',
    data() {
        return {
            items: ['خرید مصالح یا هزینه های پروژه', "پرداخت حقوق و دستمزد", "خرید ابزار و ماشین آلات",
                    "پرداخت بدهی یا پیش پرداخت", "تسویه وام های دریافتی", "برداشت شرکا"],
            amount: '',
            description: '',
            account_side: '',
            type: ''
        }
    },
    methods: {
        close_dialog() {
            this.toggleBuyAndPayDialog = false
            this.$store.commit('toggleMainDialog', true)
        },

        submit(){
            this.$store.dispatch('submitBuyAndPay', {
                    amount: this.amount,
                    description: this.description,
                    account_side: this.account_side,
                    type: this.type

             })

             this.$refs.form.reset()
        }
    },
    computed: {
        toggleBuyAndPayDialog: {
            get() { return this.$store.getters.buy_and_pay_dialog},
            set(v) { return this.$store.commit('toggleBuyAndPayDialog', v)}
        },
        sub_dialog_title: {
            get() { return this.$store.getters.sub_dialog_title},
            set() { return}
        },
    }
}
</script>

<style>
    .custom_background {
        background-color: #1E1E1E !important;
    }
</style>
