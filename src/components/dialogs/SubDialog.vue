<template>

          <v-dialog v-model="toggleSubDialog" scrollable max-width="60%">
            <div class="d-block">   
                    <span class="ml-6 mr-3" @click="close_dialog()" role="button"><v-icon>mdi-arrow-right</v-icon></span>
                    <span style="font-size: 1.5rem;">{{ sub_dialog_title }}</span>

                    <v-form lazy-validation ref="form" class="pr-16 pl-16 mt-6">
                        <v-text-field label="مبلغ" v-model="amount" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="شرح پرداخت" v-model="description" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="تاریخ پرداخت" v-model="date" style="max-width: 50%" required></v-text-field>
                        <v-text-field label="طرف حساب" v-model="account_side" style="max-width: 50%" required></v-text-field>

                        <v-btn elevation="5" large rounded color="#FFD369" 
                            class="black--text mb-3" max-width="15%" @click="toggleMainDialog()">
                         ثبت اطلاعات
                            </v-btn>
                    </v-form>

            </div>
            </v-dialog>
     
</template>

<script>
export default {
    name: 'SubDialog',
    data() {
        return {
            amount: '',
            description: '',
            date: '',
            account_side: '',
            mobile: ''

        }
    },
    methods: {
        close_dialog() {
            this.toggleSubDialog = false
            this.$store.commit('toggleMainDialog', true)
        }
    },
    computed: {
        toggleSubDialog : {
            get() { return this.$store.getters.sub_dialog},
            set(v) { return this.$store.commit('toggleSubDialog', v)}
        },
        sub_dialog_title : {
            get() { return this.$store.getters.sub_dialog_title},
            set() { return}
        }
    }
}
</script>
