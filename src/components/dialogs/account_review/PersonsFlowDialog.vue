<template>
  <v-dialog
    v-model="togglePersonsFlowDialog"
    scrollable
    max-width="60%"
    content-class="custom_background"
  >
    <div class="d-block mt-1">
      <span class="ml-6 mr-3" @click="close_dialog()" role="button"
        ><v-icon>mdi-arrow-right</v-icon></span
      >
      <span style="font-size: 1.5rem">{{ sub_dialog_title }}</span>

    <v-card-title>
      <v-text-field class="mr-10 ml-10"
        v-model="search"
        append-icon="mdi-magnify"
        label="جستجو"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

         <v-data-table
         :headers="headers"
    :items="values"
    :items-per-page="20"
          :search="search"
    class="elevation-10 mt-3 ml-3 mr-3 mb-3"
    :footer-props="{
           'items-per-page-text':'آیتم در صفحه',
           'items-per-page-options': [5, 10, 15, -1],
           'items-per-page-all-text': 'همه',   
      }"
  ></v-data-table>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "PersonsFlowDialog",
  data() {
    return {
        search: '',
        headers: [
        {
            text: 'نام',
            align: 'start',
            value: 'account_side',
        },
        {
            text: 'مبلغ',
            value: 'amount',
        },
        
        {
            text: 'توضیحات',
            sortable: false,
            value: 'description',
        },
        ]
    };
  },
  methods: {
    close_dialog() {
      this.togglePersonsFlowDialog = false;
    },
  },
  computed: {
    togglePersonsFlowDialog: {
      get() {
        return this.$store.getters.persons_flow_dialog;
      },
      set(v) {
        return this.$store.commit("togglePersonsFlowDialog", v);
      },
    },
    sub_dialog_title: {
      get() {
        return this.$store.getters.sub_dialog_title
      },
      set(v) {
        return
      },
    },

     values: {
          get() {
              return this.$store.getters.persons_flow_values
          },
          set(v) {
              return
          }
      }
  },
  mounted() {
    this.$store.dispatch("getPersonsFlow");
  },
};
</script>

<style scoped>
    >>> .v-data-footer__pagination {
     display: none;
 }
</style>
