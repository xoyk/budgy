<template>
  <div class="d-flex flex-column flex-grow-1">
    <div>
      <IncomeSelect2></IncomeSelect2>
    </div>
    <div id="new-income-button" class="item-list d-flex flex-column omb-margin-bottom" @click="add">
      <div>
        Другой доход <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 12H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </div>

    </div>
    <div v-if="newIncome">
      <div class="omb-margin-bottom">
        <OmbInput type="number" v-model="transaction.amount" label="Сумма" id="amount"></OmbInput>
      </div>
      <div>
        <OmbInput type="text" v-model="transaction.name" label="Что за доход?" id="name"></OmbInput>
      </div>
    </div>
    <div class="omb-wrapper">
      <TransactionAccountSelect text="Куда" type="receiver" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
    </div>

    <div class="flex-grow-1"></div>
  </div>
</template>

<script>

import {mapState} from "vuex";
import IncomeSelect2 from "../selects/IncomeSelect2";
import OmbInput from "../parts/OmbInput";
import TransactionAccountSelect from "../transaction/TransactionAccountSelect";

export default {
  name: "IncomeStart",
  components: {
    IncomeSelect2,
    OmbInput,
    TransactionAccountSelect
  },
  data() {
    return {
      newIncome: false,
      showAmount: false
    }
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchIncomes', this.period.now)
    },
    add() {
      this.newIncome = true
      this.showAmount = true
      this.transaction.name = this.transaction.income ? "" : this.transaction.name
      this.transaction.amount = this.transaction.income ? "" : this.transaction.amount
      this.transaction.income = ""
    }
  },
  created() {
    this.fetchData()
    this.newIncome = this.transaction.income ? false : !!(this.transaction.amount || this.transaction.name);
    this.transaction.transactionType = "income"
    this.transaction.type = "income"
    this.transaction.account.source = ""
  },
  computed: {
    ...mapState(["incomes", "period", "accounts"]),
    ...mapState({
      transaction: state => state.transaction.transaction
    }),
    router() {
      return { name: 'transaction-success'}
    },
    income_amount() {
      return this.formatAmount(this.transaction.amount)
    }
  },
};
</script>

<style scoped>
  #new-income-button {
    margin-right: 0;
    height: 47px;
    background-color: #D9FFE3;
  }
</style>
