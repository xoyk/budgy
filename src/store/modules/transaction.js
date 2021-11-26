import BudgyService from "../../services/BudgyService";

export const namespaced = true;

export const state = {
  transaction: {
    date: "",
    name: "",
    transactionType: "expense",
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
  },
  transactions: [],
  transactions2: {
    current: {},
    type: {},
    date: {},
    id: {
      items: []
    }
  },
  tabs: [
    {
      text: "Расход",
      code: "expense",
      namePlaceholder: "Куда потратили"
    },
    {
      text: "Доход",
      code: "income",
      namePlaceholder: "Откуда пришло"
    },
    {
      text: "Накопление",
      code: "saving",
      namePlaceholder: "Название"
    },
    {
      text: "Трансфер",
      code: "transfer",
      namePlaceholder: "Название"
    }
  ],
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
    state.transactions = transactions;
  },
  SET_TRANSACTIONS2(state, payload) {
    state.transactions2[payload.type] = payload.transactions;
  },
  SET_CURRENT_TRANSACTION(state, transaction ) {
    state.transactions2.current = transaction
  },
  SET_TRANSACTION_ACCOUNT(state, payload){
    console.log(payload.account, 'account ID')
    state.transaction.account[payload.type] = payload.account
  },
  CLEAR_TRANSACTION(state){
    state.transaction = {
      date: "",
      name: "",
      transactionType: "expense",
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
    var transaction = getters.getTransactionById(id)

    if (transaction) {
      commit("SET_TRANSACTION", transaction)
      commit("SET_CURRENT_PERIOD", transaction.period)
    } else {
      BudgyService.getTransaction(id)
        .then(response => {
          commit("SET_TRANSACTION", response.data.data)
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
    BudgyService.getTransactions2(period, type)
      .then(response => {
        commit("SET_TRANSACTIONS2", {transactions: response.data, type: type});
      })
      .catch(error => {
        console.log(error, "error")
        console.log("There was an error:", error.response.data.detail);
      });
  },
  setTransaction({ commit }, { transaction }){
    commit("SET_TRANSACTION", transaction)
  },
  clearTransaction({ commit }){
    commit("CLEAR_TRANSACTION")
  },
  setTransactionAccount({ commit }, payload){
    console.log(payload, 'account!')
    commit("SET_TRANSACTION_ACCOUNT", payload);
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
    if(state.transactions2.id.items !== undefined){
      return state.transactions2.id.items[id]
    } else {
      this.fetchTransactions2({period: "current", type: "id"})
    }
  }
}
