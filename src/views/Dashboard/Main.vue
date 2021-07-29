<template>
    <div>
        <NoteDialog></NoteDialog>

                        <h3 class="mb-6 mt-6 d-flex justify-center" >{{user.name}} خوش آمدید</h3>
          <v-row class=" offset-md-1  mt-3" style="margin-bottom: 0;">
                    <div style="width: 100%;">

            <Notes></Notes>    

                 </div>    
        </v-row>

    </div>
</template>

<script>

import NoteDialog from '../../components/dialogs/AddNoteDialog'
import Notes from '../../components/Notes'
import { getUser } from '../../storage'

export default {
    name: 'Main',
    components: {Notes, NoteDialog},
    data() {
        return {
            user: {}
        }
    },
    methods: {
        toggleMainDialog(){
             this.$store.commit("toggleMainDialog", !this.$store.getters.main_dialog)
        }
    },
    mounted() {
       this.user = getUser()
    }
    
}
</script>