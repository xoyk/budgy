import Vue from "vue";
import Vuex from "vuex";
import BudgyService from "@/services/BudgyService";
import axios from "axios";
import jwtDecode from "jwt-decode";

import * as transaction from '@/store/modules/transaction'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    periods: [],
    expenses: [],
    savings: [],
    incomes: [],
    accounts: [],
    savingStatus: "",
    categories: [],
    freeMoney: "",
    period: null,
    periodStub: {},
    incomeStub: {
      name: "",
      amount: 0
    },
    expenseStub: {},
    savingStub: {},
    formData: {
      name: ""
    },
    status: "",
    token: localStorage.getItem('token') || "",
    user: {},
    drawer: {},
    drawerState: "",
    buttons: {
      add: false
    },
  },
  modules: {
    transaction
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    SET_EXPENSES(state, expenses) {
      state.expenses = expenses;
    },
    SET_SAVINGS(state, savings) {
      state.savings = savings;
    },
    SET_INCOMES(state, incomes) {
      state.incomes = incomes;
    },
    SET_ACCOUNTS(state, accounts) {
      state.accounts = accounts;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_PERIOD(state, period) {
      state.period = period;
    },
    SET_PERIOD_STUB(state, period) {
      state.periodStub = period;
    },
    SET_STUB(state, data) {
      state[data.type + 'Stub'] = data.item
    },
    SET_PERIODS(state, periods) {
      state.periods = periods;
    },
    SET_CURRENT_PERIOD(state, period) {
      state.period = period
    },
    SET_FREEMONEY(state, freeMoney) {
      state.freeMoney = freeMoney;
    },
    SET_FORM_NAME(state, name) {
      state.formData.name = name
    },
    SEND_TRANSACTION_DATA() {},
    SET_DRAWER_STATE(state, status) {
      state.drawerState = status
    },
    SET_DRAWER(state, drawer) {
      state.drawer = drawer
    },
    SET_BUTTON_STATE(state, {type, status}) {
      state.buttons[type] = status
    },
    SET_CURRENT_TAB(state, tab) {
      state.currentTab = tab
      state.transaction.transaction.transactionType = tab
      state.transaction.transaction.type = tab
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        BudgyService.login(user).then(response => {
          const token = response.data.token
          let decoded = jwtDecode(token);
          localStorage.setItem('token', token)
          commit('auth_success', token, decoded.username)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}){
      //return new Promise((resolve, reject) => {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        //delete BudgyService.apiClient.defaults.headers.common['Authorization']
        resolve()
      })
    },
    fetchExpenses({ commit }, period) {
      BudgyService.getExpenses(period).then(response => {
        commit("SET_EXPENSES", response.data);
      });
    },
    fetchSavings({ commit }, period) {
      BudgyService.getSavings(period).then(response => {
        commit("SET_SAVINGS", response.data);
      });
    },
    fetchIncomes({ commit }, period) {
      BudgyService.getIncomes(period).then(response => {
        commit("SET_INCOMES", response.data);
      });
    },
    fetchAccounts({ commit }) {
      BudgyService.getAccounts().then(response => {
        commit("SET_ACCOUNTS", response.data);
      });
    },
    fetchCategories({ commit }) {
      BudgyService.getCategory().then(response => {
        commit("SET_CATEGORIES", response.data);
      });
    },
    fetchFreeMoney({ commit }, period) {
      BudgyService.getFreeMoney(period).then(
        response => {
          commit("SET_FREEMONEY", response.data)
        }
      );
    },
    fetchPeriod({ commit }, periodId) {
      BudgyService.getPeriod(periodId)
        .then(response => {
          commit("SET_PERIOD", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response.data.detail);
        });
    },
    fetchPeriodStub({ commit }) {
      BudgyService.getPeriodStub()
        .then(response => {
          commit("SET_PERIOD_STUB", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response.data.detail);
        });
    },
    createPeriod({ commit }, period) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        BudgyService.createPeriod(period)
          .then(response => {
            if (response.data.status === "ok") {
              commit("SET_PERIOD_STUB", {});
            }
            resolve(response)  // Let the calling function know that http is done. You may send some data back
          // .catch(error => {
          //   console.log("There was an error:", error.response.data.detail);
          // });
        }, error => {
          // http failed, let the calling function know that action did not work out
          reject(error)
        })
      })
    },
    setStub({ commit }, data ) {
      commit("SET_STUB", data)
    },
    savePlan({ dispatch }, data) {
      BudgyService.savePlan(data).then(r => {
        if (r.data.status === "ok") {
          dispatch("fetchIncomes", data.period)
          dispatch("fetchExpenses", data.period);
          dispatch("fetchSavings", data.period);
          dispatch("fetchFreeMoney", data.period);
        }
      })
    },
    setDrawerState({ commit }, status) {
      commit("SET_DRAWER_STATE", status)
    },
    setDrawer({ commit }, drawer) {
      commit("SET_DRAWER", drawer)
    },
    setButtonState({ commit }, payload) {
      commit("SET_BUTTON_STATE", payload)
    },
    setCurrentTab({ commit }, tab) {
      commit("SET_CURRENT_TAB", tab)
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
});
