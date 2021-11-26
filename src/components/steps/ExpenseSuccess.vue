<template>
      <div class="d-flex flex-column flex-grow-1">
        <div class="transaction-title omb-text-headline">
        <span>
          Ура! Добавлен расход {{ expenseName }}
        </span>
        </div>
        <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <div class="transaction-avatar d-flex justify-content-center flex-grow-1">
            <img src="/assets/man.svg" alt="Expense-image"/>
          </div>
          <div class="omb-text-headline-super">{{ parseInt(transaction.amount) | currency }}</div>
        </div>

        <div id="flex-5" class="d-flex justify-content-between omb-margin-4 flex-column">
          <div class="d-flex flex-column">
            <span id="expense-name">{{ expense.name }}</span>
            <div>
              <span class="balance-prev">{{ expensePrev | currency }}</span>
              <span>{{ expenseAmount | currency }}</span>
            </div>
          </div>
          <div class="d-flex flex-column">
            <span id="account-name">{{ accounts.items[transaction.account.source].name }}</span>

            <div>
              <span class="balance-prev">{{ accountNext | currency }}</span>
              <span>{{ accountAmount | currency }}</span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ExpenseSuccess",
  created() {
    // this.transaction.transactionType = 'expense'
    // this.transaction.type = 'expense'
    // this.$store.dispatch('fetchExpenses', this.period.now)
    // this.$store.dispatch('fetchAccounts')
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchExpenses', this.period.now)
      this.$store.dispatch('fetchAccounts')
    },
    changeAmountHandler() {
      this.buttons.button2.state = true
    },
    edit() {
      this.$router.push({path: "/transaction/new"})
    }
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["expenses", "period", "accounts", "freeMoney"]),
    ...mapState("transaction", ["transaction"]),
    expense() {
      if(this.transaction.expense){
        if(!this.$store.state.expenses){
          this.$store.dispatch('fetchExpenses', this.period.now)
          return this.$store.state.expenses.items[this.transaction.expense]
        } else {
          return this.$store.state.expenses.items[this.transaction.expense]
        }
      } else {
        return ""
      }
    },
    expenseAmount() {
      if(this.expense){
        return this.expense.balance - parseInt(this.transaction.amount)
      } else {
        return this.freeMoney.amount - parseInt(this.transaction.amount)
      }
    },
    expensePrev() {
      if(this.expense){
        return this.expense.balance
      } else {
        return this.freeMoney.amount
      }
    },
    accountNext() {
      return this.accounts.items[this.transaction.account.source].balance/100
    },
    accountAmount(){
      return this.accounts.items[this.transaction.account.source].balance/100 - parseInt(this.transaction.amount)
    },
    router() {
      return { name: 'transaction-edit', params: {transactionId: 'new'} }
    },
    expenseName(){
      if(this.expense){
        return '"' + this.expense.name + '"'
      } else {
        return "из свободных"
      }
    }
  }
};
</script>

<style>

</style>

<style lang="scss" scoped>
  @import "../../assets/custom.scss";

  input.active {
    font-weight: bold;
  }

  .transaction-avatar {
    background: rgba(0, 255, 91, 0.3);
    width: 120px;
    height: 120px;
    max-height: 120px;
    border-radius: 60px;
    margin-top: 38px;
    margin-bottom: 24px;
    align-items: center;
  }

  .transaction-avatar > img {
    width: 67px;
    height: 63px;
  }

  .transaction-title {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .omb-grid-4 {
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding: 24px 24px 24px 0;
    font-size: $omb-text-body;
    column-gap: 12px;
  }

  .omb-grid-5 {
    display: grid;
    justify-items: start;
    text-align: center;

  }

  .balance-prev {
    justify-self: start;
    text-decoration: line-through;
    padding-right: 4px;
    color: $omb-color-tetriary;
  }

  .omb-margin-4 {
    margin-bottom: 38px;
  }

  #expense-current {

  }

  #flex-5 {
    row-gap: 12px;
  }
</style>
