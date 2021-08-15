<template>
        <div>
                   <AddEmployeeDialog></AddEmployeeDialog>
            <v-row class=" offset-md-1  mt-3" style="margin-bottom: 0;">
            <div class="mt-6 d-inline" style="width: 80%;">
                <v-btn icon class="float-left" @click="addEmployee()"><v-icon>mdi-plus</v-icon></v-btn>
                <h2 class="notes-title">کارمندان</h2>
                <hr class="line">

                <EmployeesList></EmployeesList>
                
            </div>
        </v-row>
        </div>
</template>

<script>

import AddEmployeeDialog from '../../components/employees/AddEmployee'
import EmployeesList from '../../components/employees/EmployeesList.vue'

export default {
    name: 'Employees',
    components: {AddEmployeeDialog, EmployeesList},
    data() {
        return {

        }
    },
    methods: {
        addEmployee(){
            this.$store.commit('toggleAddEmployeeDialog', true)
        }
    }
}
</script>

<style scoped>
    .line {
        border-color: #353434;
        margin: 3px 0;
    }
</style>