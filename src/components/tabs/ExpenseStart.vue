<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex flex-column" id="inputs">
      <div class="omb-margin-bottom">
        <OmbInput type="number" v-model="transaction.amount" label="Сумма" id="amount"></OmbInput>
      </div>
      <div>
        <OmbInput type="text" v-model="transaction.name" label="Куда потратили" id="name"></OmbInput>
      </div>
    </div>
    <TransactionExpenseSelect :default="getDefault()"></TransactionExpenseSelect>
    <TransactionAccountSelect
        type="source"
        text="Как оплачиваем"
        :default="accounts.default"
        v-if="accounts.default"
    />
    <div class="flex-grow-1"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import OmbInput from "../parts/OmbInput";
import TransactionExpenseSelect from "../transaction/TransactionExpenseSelect";
import TransactionAccountSelect from "../transaction/TransactionAccountSelect";


export default {
  name: "ExpenseStart",
  components: {
    OmbInput,
    TransactionExpenseSelect,
    TransactionAccountSelect
  },
  created() {
    this.transaction.type = 'expense'
    this.transaction.account.receiver = ""
    if(this.accounts.items) {
      console.log(this.accounts.defaults, 'account defaults')
    }

    this.$store.dispatch('fetchPeriod', "current")
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchExpenses', this.period.now)
      this.$store.dispatch('fetchAccounts')
      this.$store.dispatch('fetchFreeMoney', this.period.now)
    },
    getDefault(){
      if(this.freeMoney.amount){
        console.log(this.freeMoney.amount / 100)
        return {name: 'Свободные', amount: (this.freeMoney.amount / 100) }
      }
    }
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["expenses", "period", "freeMoney"]),
    ...mapState({
      transaction: state => state.transaction.transaction,
      accounts: state => state.accounts
    }),
  },
};
</script>

<style lang="scss" scoped>
  #inputs {
    row-gap: 16px;
  }
</style>
