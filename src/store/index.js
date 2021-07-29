import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
import { saveUser, getUesrID } from '../storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: true,
    main_dialog: false,
    buy_and_pay_dialog: false,
    sub_dialog_title: '',
    note_dialog: false,
    recieve_and_sell_dialog: false,
    moving_funds_dialog: false,
    functions_dialog: false,
    petty_cash_dialog: false,
    cash_flow_dialog: false,
    notes: [],
    cashFlowsPay: [],
    cashFlowsRecieve: []
  },
  mutations: {
    toggleDrawer(state, payload) {
      state.drawer = payload
    },
    toggleMainDialog(state, payload) {
      state.main_dialog = payload
    },
    toggleBuyAndPayDialog(state, payload){
      state.buy_and_pay_dialog = payload
    },
    toggleNoteDialog(state, payload){
      state.note_dialog = payload
    },
    toggleRecieveAndSellDialog(state, payload){
      state.recieve_and_sell_dialog = payload
    },
    toggleCashFlowDialog(state, payload){
      state.cash_flow_dialog = payload
    },
    toggleFunctionsDialog(state, payload){
      state.functions_dialog = payload
    },
    toggleMovingFundsDialog(state, payload){
      state.moving_funds_dialog = payload
    },
    togglePettyCashDialog(state, payload){
      state.petty_cash_dialog = payload
    },
    setSubDialogTitle(state, payload){
      state.sub_dialog_title = payload
    },
    setNotes(state, payload) {
      state.notes = payload
    },
    deleteNotes(state, payload) {
      state.notes = state.notes.filter((e) => e !== payload)
    },
    addNote(state, payload) {
      state.notes.push(payload)
    },
    setCashFlowsPay(state, payload) {
      state.cashFlowsPay = payload
    },
    setCashFlowsRecieve(state, payload) {
      state.cashFlowsRecieve = payload
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

      saveUser({...userProfile.data(), id: user.uid})
      
      // change route to dashboard
      if (router.currentRoute.path === '/') {
        router.push({name: 'Dashboard'})
      }
    },

    async submitBuyAndPay ({commit}, data){
       await fb.buyAndPayCollection.doc().set({
         ...data, time: fb.timeStamp, user_id: getUesrID()
       })
    },

    async submitRecieveAndSell ({commit}, data){
      await fb.recieveAndSellCollection.doc().set({
        ...data, time: fb.timeStamp, user_id: getUesrID()
      })
    },

    async submitMovingFunds ({commit}, data){
      await fb.movingFundsCollection.doc().set({
        ...data, time: fb.timeStamp, user_id: getUesrID()
      })
    },

    async getNotes ({commit}, data) {

        const notes = await fb.notesCollection.where("user_id", "==", getUesrID()).get()
        const temp = []
        notes.forEach((doc) => {
          temp.push(doc.data().content)
        })
        commit('setNotes', temp)
    },

    async getCashFlowsPay ({commit}, data) {

      const valuesPay = await fb.buyAndPayCollection.where("user_id", "==", getUesrID()).get()
      const tempPay = []
      valuesPay.forEach((doc) => {
        tempPay.push(parseInt(doc.data().amount))
      })

      commit('setCashFlowsPay', tempPay)
    },

    async getCashFlowsRecieve ({commit}, data) {

      const valuesRecieve = await fb.recieveAndSellCollection.where("user_id", "==", getUesrID()).get()
      const tempRecieve = []
      valuesRecieve.forEach((doc) => {
        tempRecieve.push(parseInt(doc.data().amount))
      })

      commit('setCashFlowsRecieve', tempRecieve)
    },

    async addNote ({commit}, data) {
      await fb.notesCollection.doc().set({
        content: data, user_id: getUesrID()
      })

      commit('addNote', data)
  },

    async deleteNote({commit}, data) {
      const snapshots = await fb.notesCollection.where("content", "==", data).get()

      commit('deleteNotes', snapshots.docs[0].data().content)

      await snapshots.docs[0].ref.delete()

    },

    async signOut({ dispatch }){
      await fb.auth.signOut()

      router.push({name: 'Login'})
    }
  },
  getters: {
    drawer: (state) => {
      return state.drawer
    },
    main_dialog: (state) => {
      return state.main_dialog
    },
    buy_and_pay_dialog: (state) => {
      return state.buy_and_pay_dialog
    },
    note_dialog: (state) => {
      return state.note_dialog
    },
    sub_dialog_title: (state) => {
      return state.sub_dialog_title
    },
    recieve_and_sell_dialog: (state) => {
      return state.recieve_and_sell_dialog
    },
    moving_funds_dialog: (state) => {
      return state.moving_funds_dialog
    },
    functions_dialog: (state) => {
      return state.functions_dialog
    },
    petty_cash_dialog: (state) => {
      return state.petty_cash_dialog
    },
    cash_flow_dialog: (state) => {
      return state.cash_flow_dialog
    },
    getNotes: (state) => {
      return state.notes
    },
    cash_flows_pay_values: (state) => {
      return state.cashFlowsPay
    },
    cash_flows_recieve_values: (state) => {
      return state.cashFlowsRecieve
    }
  },
  modules: {
  }
})
