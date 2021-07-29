<template>
    <v-row class=" offset-md-1  mt-9" style="margin-bottom: 0;">
        <CashFlowDialog></CashFlowDialog>
                <div style="width: 100%;"> 
                            <h1>چه گزارشی را میخواهید مشاهده کنید؟</h1>

                           <v-col cols="8" class="mt-6" offset="1">
                                <v-list-item v-for="(item, i) in main_menu" :key="i">
                        <v-card elevation="5" class="mb-2" min-width="100%" @click="openSubDialog(item)">
                        <v-card-title v-text="item.title"></v-card-title>
                        <v-card-text v-text="item.description"></v-card-text>
                    </v-card>
                </v-list-item>
                           </v-col>

                 </div>    
        </v-row>
</template>

<script>
import CashFlowDialog from '../../components/dialogs/account_review/CashFlowDialog'
export default {
    name: 'AccountReview',
    components: {CashFlowDialog},
    data() {
        return {
            main_menu: [
                {title: "گزارش وجوه نقد", description: "مشاهده کلیه وجوه دریافت و پرداخت شده در پروژه و نیز مشاهده مانده وجه نقد"},
                {title: "گردش حساب اشخاص", description: "مشاهده گردش حساب و مانده طلب و بدهی اشخاص"},
                {title: "گزارش کارکرد ها", description: "مشاهده جزئیات کارکرد‌های کارکنان (ساعتی، روزانه و ماهانه) و پیمانکاران در پروژه"},
                {title: "ریز رویداد ها", description: "مشاهده تمامی اطلاعات ثبت شده در پروژه و تهیه گزارش‌های مورد نیاز"}
            ]
        }
    },
    methods: {
        openSubDialog(item) {
            switch (item.title) {
                case "گزارش وجوه نقد":
                        this.$store.commit('toggleCashFlowDialog', !this.$store.getters.cash_flow_dialog)
                        this.$store.commit('setSubDialogTitle', item.title)
                    break;
            
                default:
                    break;
            }
        }
    }
}
</script>