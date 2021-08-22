import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
import { saveUser, getUserID, getUser } from '../storage'

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
    persons_flow_dialog: false,
    functions_report_dialog: false,
    event_details_dialog: false,
    add_employee_dialog: false,
    notes: [],
    cashFlowsPay: [],
    cashFlowsRecieve: [],
    personsFlow: [],
    details: [],
    employees: []
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
    toggleFunctionsReportDialog(state, payload){
      state.functions_report_dialog = payload
    },
    toggleEventDetailsDialog(state, payload){
      state.event_details_dialog = payload
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
    togglePersonsFlowDialog(state, payload){
      state.persons_flow_dialog = payload
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
    toggleAddEmployeeDialog(state, payload){
      state.add_employee_dialog = payload
    },
    setSubDialogTitle(state, payload){
      state.sub_dialog_title = payload
    },
    setNotes(state, payload) {
      state.notes = payload
    },
    setDetails(state, payload) {
      state.details = payload
    },
    setPersonsFlow(state, payload) {
      state.personsFlow = payload
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
    },
    setEmployees(state, payload) {
      state.employees = payload
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      let { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

     dispatch('fetchUserProfile', user) 
    },
    async fetchUserProfile({ dispatch }, user) {

      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      saveUser({...userProfile.data(), id: user.uid})
      
      // change route to dashboard
      if (router.currentRoute.path === '/') {
        router.push({name: 'main'}).catch(err => {})
      }
    },

    async submitBuyAndPay ({ dispatch }, data){
       await fb.buyAndPayCollection.doc().set({
         ...data, time: fb.timeStamp, user_id: getUserID()
       })
    },

    async submitRecieveAndSell ({ dispatch }, data){
      await fb.recieveAndSellCollection.doc().set({
        ...data, time: fb.timeStamp, user_id: getUserID()
      })
    },

    async submitMovingFunds ({ dispatch }, data){
      await fb.movingFundsCollection.doc().set({
        ...data, time: fb.timeStamp, user_id: getUserID()
      })
    },

    async getNotes ({commit}, data) {

        const notes = await fb.notesCollection.where("user_id", "==", getUserID()).get()
        const temp = []
        notes.forEach((doc) => {
          temp.push(doc.data().content)
        })
        commit('setNotes', temp)
    },

    async createEmployee({commit}, data){
      const generateRandomString = (length=10) => Math.random().toString(20).substr(2, length) 

      const photoName = generateRandomString(10) + `${data.name}`
      const storageRef = await fb.storage.ref(photoName).put(data.image)

      const url =  await storageRef.ref.getDownloadURL()

      await fb.employeesCollection.doc().set({
             name: data.name,
             account: data.account,
             mobile: data.mobile,
             photo: url,
      })

    },

    async getCashFlowsPay ({ commit }, data) {

      const valuesPay = await fb.buyAndPayCollection.where("user_id", "==", getUserID()).get()
      const tempPay = []
      valuesPay.forEach((doc) => {
        tempPay.push(parseInt(doc.data().amount))
      })

      commit('setCashFlowsPay', tempPay)
    },

    async getCashFlowsRecieve ({ commit }, data) {

      const valuesRecieve = await fb.recieveAndSellCollection.where("user_id", "==", getUserID()).get()
      const tempRecieve = []
      valuesRecieve.forEach((doc) => {
        tempRecieve.push(parseInt(doc.data().amount))
      })

      commit('setCashFlowsRecieve', tempRecieve)
    },

    async getPersonsFlow ({commit}, data) {
        const values = await fb.movingFundsCollection.get()
        const temp = []
        values.forEach((doc) => {
          temp.push(doc.data())
        })

        commit('setPersonsFlow' , temp)
    },

    async getEventDetails ({ dispatch, commit }, data) {
      const values = await fb.movingFundsCollection.get()
      const tempMoving = []
      values.forEach((doc) => {
        tempMoving.push({...doc.data(), type: 'جابجایی حساب'})
      })
      

      const valuesRecieve = await fb.recieveAndSellCollection.where("user_id", "==", getUserID()).get()
      const tempRecieve = []
      valuesRecieve.forEach((doc) => {
        tempRecieve.push({...doc.data(), type: 'دریافت و فروش'})
      })

      const valuesPay = await fb.buyAndPayCollection.where("user_id", "==", getUserID()).get()
      const tempPay = []
      valuesPay.forEach((doc) => {
        tempPay.push({...doc.data(), type: 'پرداخت و خرید'})
      })

      commit('setDetails', [...tempMoving,...tempRecieve,...tempPay])
  },

    async addNote ({commit}, data) {
      await fb.notesCollection.doc().set({
        content: data, user_id: getUserID()
      })

      commit('addNote', data)
  },

    async deleteNote({commit}, data) {
      const snapshots = await fb.notesCollection.where("content", "==", data).get()

      commit('deleteNotes', snapshots.docs[0].data().content)

      await snapshots.docs[0].ref.delete()

    },

    async getEmployees({commit}, data) {
      const notes = await fb.employeesCollection.get()
      const temp = []
      notes.forEach((doc) => {
        temp.push(doc.data())
      })

      commit('setEmployees', temp)
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
    persons_flow_dialog: (state) => {
      return state.persons_flow_dialog
    },
    add_emoloyee_dialog: (state) => {
      return state.add_employee_dialog
    },
    functions_report_dialog: (state) => {
      return state.functions_report_dialog
    },
    getNotes: (state) => {
      return state.notes
    },
    cash_flows_pay_values: (state) => {
      return state.cashFlowsPay
    },
    cash_flows_recieve_values: (state) => {
      return state.cashFlowsRecieve
    },
    persons_flow_values: (state) => {
      return state.personsFlow
    },
    event_details_dialog: (state) => {
      return state.event_details_dialog
    },
    details: (state) => {
      return state.details
    },
    employees: (state) => {
      return state.employees
    }
  },
  modules: {
  }
})
