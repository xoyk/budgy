<template>
      <div class="d-flex flex-column flex-grow-1">
        <div class="transaction-title omb-text-headline">
          <span>
            Ура! Добавлен новый расход<br> «{{ transaction.name }}»
          </span>
        </div>
        <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <div class="transaction-avatar d-flex justify-content-center flex-grow-1" :style="{backgroundColor: expense.color ? '#' + expense.color.hex : 'rgba(0, 255, 91, 0.3)'}">
            <img src="/assets/man.svg" alt="Expense-image"/>
          </div>
          <div class="omb-text-headline-super">{{ transactionAmount | currency }}</div>
        </div>

        <TransactionBeforeAfter :resource="expense" :account="account"></TransactionBeforeAfter>
      </div>
</template>

<script>
import {mapState} from "vuex";
import TransactionBeforeAfter from "../transaction/TransactionBeforeAfter";

export default {
  name: "ExpenseSuccess",
  components: {
    TransactionBeforeAfter
  },
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
    expense() {
      if(this.transaction.expense.id){
        return {
          name: this.transaction.expense.name,
          before: this.expenses.items[this.transaction.expense.id].balance / 100,
          after: (this.expenses.items[this.transaction.expense.id].balance - parseFloat(this.transaction.amount.replace(/,/g, '.')) * 100) / 100,
        }
      } else {
        return {
          name: "из свободных",
          before: this.freeMoney.amount / 100,
          after: (this.freeMoney.amount - (parseInt(this.transaction.amount) * 100) )/ 100
        }
      }
    },
    transactionAmount() {
      return parseFloat(this.transaction.amount.replace(/,/g, '.'))
    },
    account() {
      return {
        name: this.transaction.account.source.name,
        before: this.accounts.items[this.transaction.account.source.id].balance / 100,
        after: (this.accounts.items[this.transaction.account.source.id].balance - (parseFloat(this.transaction.amount.replace(/,/g, '.')) * 100)) / 100
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../assets/custom.scss";

  .transaction-title {
    margin-top: 24px;
    margin-bottom: 24px;
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
</style>
