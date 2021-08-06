<template>
    <div class="mt-6">
        <v-container v-for="employee in employees" :key="employee.name" class="mb-1 d-inline-block">
            <v-img :src="employee.photo" width="68" height="68" style="float: left;"></v-img>
            <p class="d-inline-block">{{employee.name}}</p><br>
            <p class="d-inline-block">شماره حساب: {{employee.account}}</p>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'EmployeesList',
    data(){
        return {

        }
    },
    mounted(){
        this.$store.dispatch('getEmployees')
    },
    computed: {
        employees: {
            get(){ return this.$store.getters.employees},
            set(v){}
        }
    },
}
</script>