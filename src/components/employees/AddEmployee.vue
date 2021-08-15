<template>
    <v-dialog v-model="toggleAddEmployeeDialog" scrollable max-width="60%" content-class="custom_background">
            <div class="d-block mt-3">   
                 <span class="ml-3 mr-3" @click="close_dialog()" role="button"><v-icon>mdi-arrow-right</v-icon></span>
                    <h3 class="d-inline">افزودن به کارمندان</h3>

                   <center>
                        <v-row class="mt-6 mb-6" style="width: 90%;">
                        <v-col>
                            <v-text-field label="نام" v-model="name"></v-text-field>
                            <v-text-field label="موبایل" v-model="mobile"></v-text-field>
                            <v-text-field label="شماره حساب" v-model="account"></v-text-field>

                            <v-btn elevation="5" large rounded color="#FFD369" 
                                class="black--text" max-width="10%" @click="submit()">
                                         ثبت 
                             </v-btn>
                        </v-col>
                        <v-col>
                            <v-img
                                class="mb-3"
                                max-height="300"
                                max-width="300"
                                :src="url"
                            ></v-img>
                                <v-file-input
                                  filled
                                  :rules="rules"
                                  accept="image/png, image/jpeg, image/bmp"
                                  placeholder="یک عکس انتخاب کنید"
                                  prepend-icon="mdi-camera"
                                  label="آواتار"
                                  v-model="image"
                                ></v-file-input>
                        </v-col>
                    </v-row>
                   </center>
            </div>

            </v-dialog>
</template>

<script>
export default {
    name: 'AddEmployeeDialog',
    data(){
        return {
            image: null,
            mobile: '',
            account: '',
            name: '',
            rules: [
                value => !value || value.size < 2000000 || 'حجم عکس باید کمتر از 2 مگابایت باشد',
      ],
        }
    },
    methods: {
        close_dialog() {
            this.toggleAddEmployeeDialog = false
        },
        submit(){
                this.$store.dispatch('createEmployee', {name: this.name, mobile: this.mobile, account: this.account, image: this.image})
        }
    },
    computed: {
            toggleAddEmployeeDialog: {
                get(){ return this.$store.getters.add_emoloyee_dialog},
                set(v){ return this.$store.commit('toggleAddEmployeeDialog', v)}
            },
            url() {
                if (!this.image) return;
                 return URL.createObjectURL(this.image);
            }
    }
}
</script>