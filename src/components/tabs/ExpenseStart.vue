<template>
  <div class="omb-grid-3">
    <div class="d-flex flex-column" id="inputs">
      <div class="omb-margin-bottom">
        <OmbInput type="number" v-model="transaction.amount" label="Сумма" id="amount"></OmbInput>
      </div>
      <div>
        <OmbInput type="text" v-model="transaction.name" label="Куда потратили" id="name"></OmbInput>
      </div>
    </div>
    <TransactionExpenseSelect :default="{name: 'Свободные', amount: freeMoney.amount }"></TransactionExpenseSelect>
    <TransactionAccountSelect
        type="source"
        text="Как оплачиваем"
        :default="accounts.default"
        v-if="accounts.default"
    />
    <div id="buttons">
      <Buttons :button1="buttons.button1" :button2="buttons.button2" v-on:clicked="saveTransaction"></Buttons>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Buttons from "../parts/Buttons";
import OmbInput from "../parts/OmbInput";
import TransactionExpenseSelect from "../transaction/TransactionExpenseSelect";
import TransactionAccountSelect from "../transaction/TransactionAccountSelect";

export default {
  name: "ExpenseStart",
  components: {
    Buttons,
    OmbInput,
    TransactionExpenseSelect,
    TransactionAccountSelect
  },
  data() {
    return {
      buttons: {
        button1: {
          text: "Назад",
          color: ""
        },
        button2: {
          text: "Далее",
          color: "",
        },
      }
    }
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
    saveTransaction(){
      this.$store.dispatch('transaction/saveTransaction', this.transaction)
      .then(() => {
        this.$router.push({name: "transaction-success", params: {type: this.transaction.type} })
      })
      .catch(() => {});
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

<style>

</style>

<style lang="scss" scoped>
  button#transactionDate {
    border-radius: 16px;
    height: 52px;
  }

  .omb-grid-3 {
    display: grid;
    grid-template-rows: 144px 1fr;
    row-gap: 16px;
  }

  input.active {
    font-weight: bold;
  }

  #buttons {
    position: sticky;
    bottom: 0;
    height: 104px;
  }

  #inputs {
    row-gap: 16px;
  }
</style>
