<template>
      <div class="d-flex flex-column flex-grow-1">
        <div class="transaction-title omb-text-headline">
          <span>
            Ура! Добавлен новый расход<br> «{{ transaction.name }}»
          </span>
        </div>
        <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <div class="transaction-avatar d-flex justify-content-center flex-grow-1" :style="{backgroundColor: item.color ? '#' + item.color.hex : 'rgba(0, 255, 91, 0.3)'}">
            <img src="/assets/man.svg" alt="Expense-image"/>
          </div>
          <div class="omb-text-headline-super">{{ transactionAmount | currency }}</div>
        </div>

        <div id="flex-5" class="d-flex justify-content-between omb-margin-4 flex-column">
          <div class="d-flex justify-content-between">
            <span id="expense-name">{{ expenseName }}</span>
            <div>
              <span class="balance-prev">{{ expensePrev | currency }}</span>
              <span>{{ expenseAmount | currency }}</span>
            </div>
          </div>
          <div class="d-flex justify-content-between">

            <span id="account-name">{{ transaction.account.source.name }}</span>

            <div>
              <span class="balance-prev">{{ accountPrev | currency }}</span>
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
  methods: {
    fetchData() {
      this.$store.dispatch('fetchExpenses', this.period.now)
      this.$store.dispatch('fetchAccounts')
    },
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["expenses", "incomes", "savings", "period", "accounts", "freeMoney"]),
    ...mapState("transaction", ["transaction"]),
    item() {
      if(this.transaction){
        return this.transaction
      } else {
        return {
          name: "из свободных",
          amount: this.freeMoney.amount - (parseInt(this.transaction.amount) * 100)
        }
      }
    },
    transactionAmount() {
      return parseFloat(this.transaction.amount.replace(/,/g, '.'))
    },
    expenseAmount() {
      let result
      let amount = parseFloat(this.transaction.amount.replace(/,/g, '.')) * 100
      if(this.transaction.expense.id){
        result = this.expenses.items[this.transaction.expense.id].balance - amount
      } else {
        result = this.freeMoney.amount - amount
      }
      return result / 100
    },
    expensePrev() {
        if(this.transaction.expense.id){
          return this.expenses.items[this.transaction.expense.id].balance / 100
        } else {
          return this.freeMoney.amount / 100
        }
    },
    accountPrev() {
      return this.accounts.items[this.transaction.account.source.id].balance / 100
    },
    accountAmount(){
      return (this.accounts.items[this.transaction.account.source.id].balance - (parseFloat(this.transaction.amount.replace(/,/g, '.')) * 100)) / 100
    },
    expenseName(){
      if(this.transaction.expense.name){
        return this.transaction.expense.name
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
