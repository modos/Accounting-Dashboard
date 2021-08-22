<template>
        <div class="mt-6" style="max-width: 80%;">
                    <v-btn icon class="float-left atlas-add-note-button" @click="addNote()"><v-icon>mdi-plus</v-icon></v-btn>
                    <h2 class="notes-title">یادداشت های شما</h2>
        <hr class="notes-line">
    <div class="notes-main-div  d-flex flex-wrap">

        <v-card v-for="(item, i) in notes" :key="i" elevation="5" class="mt-5" style="max-width: 40%; margin-left: 5px; max-height: 40px">
            <v-card-title class="d-inline">{{ item }}</v-card-title>
            <v-btn icon class="float-left" @click="deleteItem(item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
        </v-card>
    </div>
        </div>
</template>

<script>

export default {
    name: 'Notes',
    data(){
        return {
        }
    },
    mounted() {
        this.$store.dispatch('getNotes')
    },
    computed: {
        notes: {
             get () { return this.$store.getters.getNotes },
             set (v) { return }
        }
    },
    methods: {
        deleteItem (item) {
            this.$store.dispatch('deleteNote', item)
        },
        
        addNote(){
            this.$store.commit('toggleNoteDialog', true)
        }
    }
}
</script>

<style scoped>
    .notes-main-div {
        background-color: #1E1E1E;
        margin-right: 10px;
        margin-top: 32px;
        max-height: 200px;
        overflow: auto;
        border: 5px solid #272727;
        border-radius: 20px;
        padding: 16px;

    }

    .notes-line {
        border-color: #353434;
        margin: 3px 0;
    }

     ::-webkit-scrollbar-button {
            height: 15px;
    }

</style>