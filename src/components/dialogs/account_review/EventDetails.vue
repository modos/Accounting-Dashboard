<template>
  <v-dialog
    v-model="toggleEventDetailsDialog"
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
           'items-per-page-all-text': 'همه' 
      }"
  ></v-data-table>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "EventDetailsDialog",
  data() {
    return {
        search: '',
        headers: [
          {
            text: 'مبلغ',
            value: 'amount',
        },
        {
            text: 'طرف حساب',
            sortable: false,
            value: 'account_side',
        },
        {
            text: 'توضیحات',
            sortable: false,
            value: 'type',
        },
        {
            text: 'تاریخ',
            value: 'date'
        },
        ]
    };
  },
  methods: {
    close_dialog() {
      this.toggleEventDetailsDialog = false;
    },
  },
  computed: {
    toggleEventDetailsDialog: {
      get() {
        return this.$store.getters.event_details_dialog;
      },
      set(v) {
        return this.$store.commit("toggleEventDetailsDialog", v);
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
              return this.$store.getters.details
          },
          set(v) {
              return
          }
      }
  },
  mounted() {
    this.$store.dispatch("getEventDetails");
  },
};
</script>

<style scoped>
    >>> .v-data-footer__pagination {
     display: none;
 }
</style>
