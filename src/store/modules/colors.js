import BudgyService from "../../services/BudgyService";

export const namespaced = true;

export const state = {
  colors: {
    expenses: {
      953: "#6dbe2e"
    }
  },
}

export const mutations = {
  ADD_TRANSACTION(state, transaction) {
    state.transactions2.id.items.push(transaction)
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
