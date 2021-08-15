<template>
  <v-container fill-height fluid class="py-6" color="#222831">
    <v-row align="center" justify="center">
      <v-card width="40%" class="px-12" elevation="10">
        <v-card-title class="d-flex justify-center mb-6"
        ><h1>ورود</h1></v-card-title>

        <v-form>
          <v-text-field
          label="ایمیل"
          v-model="email"
          ></v-text-field>
          <v-text-field
          label="رمز عبور"
          type="password"
          v-model="password"
          ></v-text-field>

         <v-card-actions class="justify-center">
               <v-btn color="#FFD369" class="black--text" @click="submit()">
                   <v-progress-circular v-if="loading"
                           indeterminate
                           :size="20"
                           color="black"
                         ></v-progress-circular>
                       <h3 v-else>ورود</h3>
            </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        loading: false
      }
    },
    methods: {
      submit(){
        this.loading = true
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
      }
    }
  }
</script>

<style>
.container {
  background-color: #222831;
}

.v-btn {
  width: 40%;
}

</style>
