<template>
  <div class="text-md-left ml-5 p-4" id="container" >
    <div>Доходов {{ incomes.total }}</div>
    <div>Расходов {{ expenses.total }}</div>
    <div>Свободные средства (простой вариант, для плана на будущие месяцы) = Доходы({{ incomes.total }}) - Расходы ({{ expenses.total }})= {{ incomes.total - expenses.total }} </div>
    <div>Свободные средства (текущий период, учитывает неполученные доходы и остаток на регулярных счетах) =
      Доходы({{ incomes.activeTotal }}) + Остаток на счетах ({{ accounts.regularTotal / 100 }})- Непотраченные расходы ({{ expenses.activeTotal }}) - Сумма запланированных накоплений ({{ savings.activeTotal}})
      = {{ incomes.activeTotal + (accounts.regularTotal/100) - expenses.activeTotal - savings.activeTotal }} </div>
    <div>Транзакций из свободных средств (без расходной статьи): {{ freeMoneyTransactionsSum }}</div>
    <div>Осталось расходов из {{ expenses.total }}: {{ expenses.active }}</div>
    <div>Осталось неполученных доходов из {{ incomes.total }}: {{ incomes.activeTotal }}</div>
    <div>На регулярных счетах: {{ accounts.regularTotal / 100 }}</div>
    <div v-if="transactions2.type">
      <div v-if="transactions2.type.items.expense">
        <div v-for="transaction in freeMoneyTransactions" :key="transaction.id">
          <div>{{transaction.name}} - {{ transaction.amount }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "Debug",
  watch: {
    '$store.state.period': 'fetchData'
  },
  data() {
    return {

    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchIncomes', this.period.now)
      this.$store.dispatch('fetchAccounts', this.period.now)
      this.$store.dispatch('fetchSavings', this.period.now)
      this.$store.dispatch('fetchTransactions2', { period: this.period.now, type: "type"})
    },
  },
  computed: {
    freeMoneyTransactions() {
      let regularAccounts = Object.keys(this.accounts.regular)
      var result = this.transactions2.type.items.expense.filter(transaction => {
        if(transaction.expense === null && regularAccounts.includes(transaction.account_source.id.toString())) {
          return true
        }
      });

      return result;
      },
    freeMoneyTransactionsSum() {
      let sum = 0
      for(let transaction of this.freeMoneyTransactions){
        sum += transaction.amount
      }

      return sum
    },
    ...mapState(["incomes", "expenses", "period", "transactions", "transactions2", "accounts", "savings"])
  }
}
</script>

<style scoped>
  #container {
    border: #2db487 solid;

  }
</style>
