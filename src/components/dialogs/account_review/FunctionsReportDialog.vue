<template>
  <v-dialog
    v-model="toggleFunctionsReportDialog"
    scrollable
    max-width="60%"
    content-class="custom_background"
  >
    <div class="d-block">
      <span class="ml-6 mr-3" @click="close_dialog()" role="button"
        ><v-icon>mdi-arrow-right</v-icon></span
      >
      <span style="font-size: 1.5rem">{{ sub_dialog_title }}</span>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "PersonsFlowDialog",
  data() {
    return {
       
    };
  },
  methods: {
    close_dialog() {
      this.toggleFunctionsReportDialog = false;
    },
  },
  computed: {
    toggleFunctionsReportDialog: {
      get() {
        return this.$store.getters.functions_report_dialog;
      },
      set(v) {
        return this.$store.commit("toggleFunctionsReportDialog", v);
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
  },
};
</script>