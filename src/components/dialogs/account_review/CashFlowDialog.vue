<template>

          <v-dialog v-model="toggleCashFlowDialog" scrollable max-width="60%" content-class="custom_background">
  
                   <div class="d-block mt-1">   
                    <span class="ml-6 mr-3" @click="close_dialog()" role="button"><v-icon>mdi-arrow-right</v-icon></span>
                    <span style="font-size: 1.5rem;">{{ sub_dialog_title }}</span>

                    <div class="d-block mt-3">
                        <v-btn large rounded class="ml-3 mr-3 black--text" max-width="60px" color="#FFD369">دریافتی</v-btn>
                        <v-btn large rounded max-width="60px">پرداختی</v-btn>
                    </div>

                                    <div style="padding: 16px" class="d-block">
                                         <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="cash_flows_pay_values"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          line-width="2"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }} تومان
          </template>
        </v-sparkline>
      </v-sheet>
                </div>

                 <div style="padding: 16px" class="d-block">
                                         <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="cash_flows_recieve_values"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          line-width="2"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }} تومان
          </template>
        </v-sparkline>
      </v-sheet>
                </div>

                    </div>

            </v-dialog>
     
</template>

<script>
export default {
    name: 'CashFlowDialog',
    data() {
        return {

        }
    },
    methods: {
        close_dialog(){
            this.toggleCashFlowDialog = false
        }
    },
    computed: {
        toggleCashFlowDialog: {
            get(){ return this.$store.getters.cash_flow_dialog},
            set(v){ return this.$store.commit('toggleCashFlowDialog', v) }
        },
        sub_dialog_title: {
            get(){ return this.$store.getters.sub_dialog_title},
            set(v){return}
        },
        cash_flows_pay_values: {
            get(){ return this.$store.getters.cash_flows_pay_values},
            set(v){return} 
        },
        cash_flows_recieve_values: {
            get(){ return this.$store.getters.cash_flows_recieve_values},
            set(v){return} 
        },
    },
    mounted() {
        this.$store.dispatch('getCashFlowsPay')
        this.$store.dispatch('getCashFlowsRecieve')
    }
}
</script>