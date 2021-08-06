<template>
    <v-dialog v-model="toggleRecieveAndSellDialog" scrollable max-width="60%" content-class="custom_background">
            <div class="d-block mt-3">   
                    <span class="ml-6 mr-3" @click="close_dialog()" role="button"><v-icon>mdi-arrow-right</v-icon></span>
                    <span style="font-size: 1.5rem;">{{ sub_dialog_title }}</span>

                    <v-form lazy-validation ref="form" class="pr-16 pl-16 mt-6">
                        <v-text-field label="مبلغ" v-model="amount" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="شرح پرداخت" v-model="description" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="دریافت از" v-model="account_side" style="max-width: 50%" required></v-text-field>

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
       data(){
              return {
                     items: ["دریافت از سرمایه گذاران", "درآمد و فروش", "طلب یا پیش دریافت"
                            , "برگشت خرید مصالح و هزینه های پروژه", "برگشت ابزار و ماشین آلات",
                            "دریافت وام یا قرض از اشخاص", "سایر موارد"],
                     amount: '',
                     description: '',
                     account_side: '',
                     type: ''
              }
       },
       methods: {
        close_dialog() {
            this.toggleRecieveAndSellDialog = false
            this.$store.commit('toggleMainDialog', true)
        },

        submit(){
            this.$store.dispatch('submitRecieveAndSell', {
                    amount: this.amount,
                    description: this.description,
                    account_side: this.account_side,
                    type: this.type,
                    date: new Date().toLocaleDateString('fa-IR')

             })
             this.$refs.form.reset()
        }
    },
       computed: {
              toggleRecieveAndSellDialog: {
                     get(){ return this.$store.getters.recieve_and_sell_dialog },
                     set(v){ return this.$store.commit('toggleRecieveAndSellDialog', v)}
              },
              sub_dialog_title: {
                     get() { return this.$store.getters.sub_dialog_title},
                     set() { return}
        },
       }
}
</script>