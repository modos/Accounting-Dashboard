<template>
                <v-dialog
                v-model="toggleMainDialog"
                scrollable
                 max-width="60%"
            >
            <v-list>
            <span class="ml-6 mr-3" @click="toggleMainDialog = false" role="button"><v-icon>mdi-arrow-right</v-icon></span>
            <span style="font-size: 1.5rem;">قصد انجام چه کاری را دارید؟</span>
                <div  style="background-color: #1E1E1E;">
                    <v-col cols="12" class="mt-6">
                    <v-list-item v-for="(item, i) in main_menu" :key="i">
                        <v-card elevation="5" class="mb-2" min-width="100%" @click="openSubDialog(item)">
                        <v-card-title v-text="item.name"></v-card-title>
                        <v-card-text v-text="item.description"></v-card-text>
                    </v-card>
                </v-list-item>
                </v-col>
                </div>
            </v-list>
            
            </v-dialog>
</template>

<script>
export default {
    name: 'MainDialog',
    data() {
        return {
             dialog: false,
             main_menu: [
                {name: "پرداخت و خرید", description: "ثبت پرداخت‌ها و خریدهای پروژه، مانند: خرید مصالح یا ماشین‌آلات و یا پرداخت هزینه‌های عمومی یا دستمزدها و یا اجازه ماشین‌آلات"},
                {name: "دریافت و فروش", description: "ثبت دریافت‌ها، صورت وضعیت‌های درآمدی و فروش‌ها، مانند: دریافت از سرمایه‌گذار یا شرکا، فروش ضایعات، فروش ماشین‌آلات و …",},
                {name: "ثبت کارکرد", description: "زمان‌های کارکرد کارکنان و صورتحساب پیمانکاران را ثبت نمایید تا نرم افزار به صورت خودکار حقوق آن‌ها را محاسبه و در حساب ایشان اعمال کند.",},
                {name: "جابجایی وجه", description: "ثبت جابجایی‌های انجام شده بین حساب‌های بانکی یا صندوق‌ها.",},
                {name: "تهیه گزارش تنخواه", description: "پرداخت‌ها و دریافت‌های خود را در قالب یک گزارش تنخواه تهیه و برای کارفرما یه سایر اشخاص ارسال کنید.",},

            ]
        }
    },
    methods: {
        openSubDialog(item){

            switch (item.name) {
                case 'پرداخت و خرید':
                        this.$store.commit('toggleBuyAndPayDialog', !this.$store.getters.buy_and_pay_dialog)
                        this.$store.commit('setSubDialogTitle', item.name)
                    break
                case 'دریافت و فروش':
                        this.$store.commit('toggleRecieveAndSellDialog', !this.$store.getters.recieve_and_sell_dialog)
                        this.$store.commit('setSubDialogTitle', item.name)
                    break
                case 'جابجایی وجه':
                        this.$store.commit('toggleMovingFundsDialog', !this.$store.getters.moving_funds_dialog)
                        this.$store.commit('setSubDialogTitle', item.name)
                    break
                case 'ثبت کارکرد':
                        this.$store.commit('toggleFunctionsDialog', !this.$store.functions_dialog)
                        this.$store.commit('setSubDialogTitle', item.name)
                    break
                case 'تهیه گزارش تنخواه':
                        this.$store.commit('togglePettyCashDialog', !this.$store.petty_cash_dialog)
                        this.$store.commit('setSubDialogTitle', item.name)
                    break                                                     
            
                default:
                    break
            }

            // this.$store.commit('toggleSubDialog', !this.$store.getters.sub_dialog)
            // this.$store.commit('setSubDialogTitle', item.name)
            this.toggleMainDialog = false
        }
    },
    computed: {
        toggleMainDialog: {
             get () { return this.$store.getters.main_dialog },
             set (v) { return this.$store.commit('toggleMainDialog', v) }
        }
    }
}
</script>