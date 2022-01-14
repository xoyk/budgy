<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex flex-column" id="inputs">
      <div class="omb-margin-bottom">
        <OmbInput type="text" v-model="transaction.amount" label="Сумма" id="amount"></OmbInput>
      </div>
      <div>
        <OmbInput type="text" v-model="transaction.name" label="Куда потратили" id="name"></OmbInput>
      </div>
    </div>
    <TransactionExpenseSelect></TransactionExpenseSelect>
    <TransactionAccountSelect
        type="source"
        text="Как оплачиваем"
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

    if(!this.transaction.expense) {
      this.transaction.expense = {
        name: 'из свободных'
      }
    }

    this.transaction.account.receiver = ""

    this.$store.dispatch('fetchPeriod', "current")
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchAccounts')
    },
    checkDefault() {
      if(!this.transaction.account.source.id) {
        if(this.accounts.default) {
          this.$store.dispatch('transaction/setDefaultAccount', {type: 'source', account: this.accounts.default})
        }
      }
    }
  },
  watch: {
    '$store.state.period': 'fetchData',
    '$store.state.transaction': 'fetchData',
    '$store.state.accounts.default': 'checkDefault',
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
