import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: true,
    main_dialog: false,
    sub_dialog: false,
    sub_dialog_title: ''
  },
  mutations: {
    toggleDrawer(state, payload) {
      state.drawer = payload
    },
    toggleMainDialog(state, payload) {
      state.main_dialog = payload
    },
    toggleSubDialog(state, payload){
      state.sub_dialog = payload
    },
    setSubDialogTitle(state, payload){
      state.sub_dialog_title = payload
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      //commit('setUserProfile', userProfile.data())
      console.log(userProfile)

      // change route to dashboard
      if (router.currentRoute.path === '/') {
        router.push({name: 'Dashboard'})
      }
    },

    async signOut({ dispatch }){
      await fb.auth.signOut()

      router.push({name: 'Home'})
    }
  },
  getters: {
    drawer: (state) => {
      return state.drawer
    },
    main_dialog: (state) => {
      return state.main_dialog
    },
    sub_dialog: (state) => {
      return state.sub_dialog
    },
    sub_dialog_title: (state) => {
      return state.sub_dialog_title
    }
  },
  modules: {
  }
})
