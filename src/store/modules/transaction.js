import BudgyService from "../../services/BudgyService";

export const namespaced = true;

export const state = {
  transaction: {
    date: "",
    name: "",
    type: "expense",
    amount: "",
    expense: "",
    saving: "",
    income: "",
    account: {
      source: "",
      receiver: ""
    }
  },
  transactions: [],
  transactions2: {
    current: {},
    // type: {}, // TODO show transaction of one type only, "show me expense transactions"
    day: {},
    id: {}
  },
  tabs:
    {
      expense: {
        text: "Расход",
        code: "expense",
        namePlaceholder: "Куда потратили"
      },
      income: {
        text: "Доход",
        code: "income",
        namePlaceholder: "Откуда пришло"
      },
      saving: {
        text: "Накопление",
        code: "saving",
        namePlaceholder: "Название"
      },
      transfer: {
        text: "Трансфер",
        code: "transfer",
        namePlaceholder: "Название"
      }
    },
  currentTab: "expense"
}

export const mutations = {
  ADD_TRANSACTION(state, transaction) {
    state.transactions2.id.items.push(transaction)
  },
  SET_TRANSACTION(state, transaction) {
    state.transaction = transaction
  },
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions
  },
  SET_TRANSACTIONS2(state, payload) {
    state.transactions2[payload.type] = payload.transactions;
  },
  SET_CURRENT_TRANSACTION(state, transaction ) {
    state.transactions2.current = transaction
  },
  SET_TRANSACTION_ACCOUNT(state, payload){
    state.transaction.account[payload.type] = payload.account
  },
  SET_TRANSACTION_DEFAULT_ACCOUNT(state, payload) {
      state.transaction.account[payload.type] = payload.account
  },
  CLEAR_TRANSACTION(state){
    state.transaction = {
      date: "",
      name: "",
      type: "expense",
      amount: "",
      expense: "",
      saving: "",
      income: "",
      category: "",
      account: {
        source: "",
        receiver: ""
      }
    }
  },
  SET_SAVING_STATUS(state, status) {
    state.savingStatus = status;
  },
}

export const actions = {
  fetchTransaction({ commit, getters }, id) {
      let transaction = getters.getTransactionById(id)

      if (transaction) {
        transaction.amount = transaction.amount.toString()
        commit("SET_TRANSACTION", transaction)
      } else {
        BudgyService.getTransaction(id)
          .then(response => {
            transaction = response.data.data
            transaction.amount = transaction.amount.toString()

            commit("SET_TRANSACTION", transaction)
          })
          .catch(error => {
            // const notification = {
            //   type: "error",
            //   message: "There was a problem fetching event: " + error.message
            // };
            console.log("There was a problem fetching event: " + error.message)
            // dispatch("notification/add", notification, { root: true })
          });
      }
  },
  fetchTransactions({ commit }, period) {
    BudgyService.getTransactions(period)
      .then(response => {
        commit("SET_TRANSACTIONS", response.data);
      })
      .catch(error => {
        console.log("There was an error:", error.response.data.detail);
      });
  },
  fetchTransactions2({ commit }, {period, type }) {
    return new Promise((resolve, reject) => {
      BudgyService.getTransactions2(period, type)
        .then(response => {
          commit("SET_TRANSACTIONS2", {transactions: response.data, type: type});
          resolve()
        })
        .catch(error => {
          console.log(error, "error")
          console.log("There was an error:", error.response.data.detail);
          reject()
        });
    })
  },
  setTransaction({ commit }, { transaction }){
    commit("SET_TRANSACTION", transaction)
  },
  clearTransaction({ commit }){
    commit("CLEAR_TRANSACTION")
  },
  setTransactionAccount({ commit }, payload){
    commit("SET_TRANSACTION_ACCOUNT", payload);
  },
  setDefaultAccount({ commit }, payload){
    commit("SET_TRANSACTION_DEFAULT_ACCOUNT", payload);
  },
  saveTransaction({ commit, dispatch }, data) {
    commit("SET_SAVING_STATUS", "saving");
    BudgyService.saveTransaction(data).then(response => {
      if (response.data.status === "ok") {
        commit("SET_SAVING_STATUS", "saved");
        dispatch("fetchTransactions", this.state.period.current.id);
      }
    });
  },
}

export const getters = {
  getTransactionById: state => id => {
    if(state.transactions2.id !== undefined){
      return state.transactions2.id[id]
    } else {
      console.log('cant find transaction, srry')
    }
  }
}
