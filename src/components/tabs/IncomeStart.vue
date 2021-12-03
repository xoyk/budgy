<template>
  <div class="income-fields">
    <div>
      <IncomeSelect2></IncomeSelect2>
    </div>
    <div id="new-income-button" class="item-list d-flex flex-column" @click="add">
      <div>
        Другой доход <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 12H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </div>

    </div>
    <div v-if="newIncome">
      <TransactionInput mask-type="currency" type="number" placeholder="Сумма" v-model="transaction.amount"></TransactionInput>
      <TransactionInput type="text" placeholder="Что за доход?" v-model="transaction.name"></TransactionInput>
    </div>
    <div class="omb-wrapper">
      <TransactionAccountSelect text="Куда" type="receiver" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
    </div>

    <div class="drawer-buttons d-flex justify-content-between">
      <div class="d-flex flex-grow-1" @click="cancel" v-if="buttons.button1">
        <button id="first-button" class="flex-grow-1 omb-button-secondary">{{  buttons.button1.text }}</button>
      </div>

      <div class="d-flex flex-grow-1">
        <button class="flex-grow-1 omb-button-primary" @click="save">{{ buttons.button2.text }}</button>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";
import IncomeSelect2 from "../selects/IncomeSelect2";
import TransactionInput from "../transaction/TransactionInput";
import TransactionAccountSelect from "../transaction/TransactionAccountSelect";

export default {
  name: "IncomeStart",
  components: {
    IncomeSelect2,
    TransactionInput,
    TransactionAccountSelect
  },
  data() {
    return {
      buttons: {
        button1: {
          text: "Отменить",
          color: ""
        },
        button2: {
          text: "Добавить",
          color: "",
          router: this.router
        },
      },
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
    cancel() {
      // TODO: КОПИПАСТА
      this.$router.push({name: "index"})
      this.$store.dispatch("transaction/clearTransaction")
    },
    save() {
      event.preventDefault();
      this.$store
          .dispatch("transaction/saveTransaction", this.transaction)
          .then(() => {
            this.$store.dispatch("transaction/clearTransaction")
            this.$router.push({name: "index"})
          })
          .catch(() => {});
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
    this.newIncome = this.transaction.income ? false : (this.transaction.amount || this.transaction.name ? true : false);
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
  .income-fields {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 16px;
    width: 100%;
  }

  #new-income-button {
    margin-right: 0;
    height: 47px;
    background-color: #D9FFE3;
  }
</style>
