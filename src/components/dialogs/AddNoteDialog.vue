<template>

          <v-dialog v-model="toggleNoteDialog" scrollable max-width="60%" content-class="custom_background">
            <div class="d-block mt-3">   
                 <span class="ml-3 mr-3" @click="close_dialog()" role="button"><v-icon>mdi-arrow-right</v-icon></span>
                    <h3 class="d-inline">افزودن یادداشت جدید</h3>
                    <v-text-field
                     label="متن یادداشت" 
                     required
                     v-model="content"
                    style="max-width: 50%; margin: 0 auto"></v-text-field>

<div style="width: 100%;" class="d-flex justify-center mt-3 mb-3">
                  <v-btn elevation="5" large rounded color="#FFD369" 
             class="black--text" max-width="10%" @click="submit()">
              ثبت 
            </v-btn>
</div>

            </div>
            </v-dialog>
     
</template>

<script>
export default {
    name: 'NoteDialog',
    data() {
        return {
            content: ''
        }
    },
    methods: {
        close_dialog() {
            this.toggleNoteDialog = false
        },

        submit(){
            this.$store.dispatch('addNote', this.content)
            this.content = ''
        }
    },
    computed: {
        toggleNoteDialog: {
            get() { return this.$store.getters.note_dialog},
            set(v) { return this.$store.commit('toggleNoteDialog', v)}
        }
    }
}
</script>
