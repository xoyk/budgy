<template>
  <div>
    <div v-if="transactions" class="omb-margin-1">
      <div v-for="transactionDay in transactions"
           :key="transactionDay.day" class="budgy-list-group d-flex flex-column">
        <div class="transaction-date omb-text-title">{{ formatDate(transactionDay.day) }}</div>
        <router-link :to="{name: 'index', params: {transactionId: transaction.id}} " v-for="transaction in transactionDay.items" :key="transaction.id">
              <div class="budgy-list-item d-flex justify-content-between" @click="editTransaction(transaction)">
                <BudgyItemIcon :item="getIconItem(transaction)"/>
                <div class="flex-grow-1" id="budgy-name">
                  <div class="flex-grow-1 omb-text-body d-flex justify-content-between text-left">
                    <div class="align-self-start">
                      {{ transactionName(transaction)}}
                    </div>
                    <div class="transaction-amount" :class="getStyle(transaction.type)"><span v-if="transaction.type === 'income'">+</span>{{ transaction.amount | currency }}</div>


                  </div>

                  <div class="d-flex flex-row-reverse justify-content-between align-items-center">
                    <div class="account-name omb-text-caption omb-color-secondary">
                      <span v-if="transaction.account_source">{{ transaction.account_source.name }}</span>
                      <span v-if="transaction.type === 'transfer' || transaction.type === 'saving'">
                        <b-icon-arrow-right-short variant="primary"></b-icon-arrow-right-short>
                      </span>
                      <span v-if="transaction.account_receiver">{{ transaction.account_receiver.name }}</span>
                    </div>

                    <div class="budgy-category omb-text-caption omb-color-secondary" v-if="transaction.type === 'expense'">{{ expenseName(transaction) }}</div>

                  </div>
                </div>

              </div>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';
import BudgyItemIcon from "./parts/BudgyItemIcon";

export default {
  name: "TransactionList",
  components: {
    BudgyItemIcon
  },
  created() {
    this.fetchData()
    this.$store.dispatch("setButtonState", {type: "add", status: true})
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchExpenses", this.period.current.id);
      this.$store.dispatch("transaction/fetchTransactions", this.period.current.id);
      this.$store.dispatch('transaction/fetchTransactions2', { period: this.period.now, type: "id"})
    },
    formatDate(date){
      moment.locale('ru')
      return moment(date, 'YYYYMMDD').format('D MMMM')
    },
    formatAmount(amount, maxFraction = 0) {
      return amount.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: maxFraction})
    },
    getIconItem(transaction){
      switch (transaction.type){
        case 'income':
          return {color: {
              hex: "C8FADC"
            }
          }
        case 'saving': {
          return {color: {
              hex: "FAF1AF"
            }
          }
        }
        case 'transfer': {
          return {color: {
              hex: "C8F7FA"
            }
          }
        }
        case 'expense': {
          if(transaction.expense){
            return transaction.expense
          } else {
            return {color: {
                hex: "F5F5F5"
              }
            }
          }
        }
      }
    },
    getStyle(type){
      if(type === 'income'){
        return 'omb-color-success'
      } else {
        return ""
      }
    },
    transactionName(transaction) {
      if(transaction.name === ""){
        switch (transaction.type){
          case 'transfer':
            return 'Трансфер'
          case 'expense':
            if(transaction[transaction.type])
              return transaction[transaction.type]['name']
            else
              return "Расход"
          case 'income':
            return 'Доход'
          case 'saving':
            return 'Накопление на ' + transaction.saving.name
        }
      } else {
        return transaction.name
      }
      return "Транзакция"
    },
    editTransaction(transaction){
      console.log(transaction)
      // this.$router.push({'name': 'transaction-edit', params: {'transaction': transaction, 'transactionId': transaction.id.toString()}})
    },
    expenseName(transaction) {
      if(transaction.expense){
        return this.expenses.items[transaction.expense.id].name
      } else {
        return "со свободных"
      }
    },
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["period", "drawer", "expenses"]),
    ...mapState("transaction", ['transactions'])
  }
};
</script>

<style scoped>
  .budgy-list-item {
    color: black;
    text-decoration: none;
    padding: 12px 0;
  }

  a {
    color: black;
    text-decoration: none;
    display: block;
  }

  a:hover {
    text-decoration: none;
  }

  .budgy-list-group {

  }

  #budgy-name {
    margin-left: 8px;
  }

  .transaction-date {
    text-align: left;
    margin-top: 32px;
  }

</style>
