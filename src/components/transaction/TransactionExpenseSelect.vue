<template>
  <div>
    <SectionHeader text="Откуда списываем"></SectionHeader>
    <OmbSelect :title="name" :amount="amount" v-on:clicked="showExpenses" :color="getColor()"></OmbSelect>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OmbSelect from "./OmbSelect";
import SectionHeader from "../parts/SectionHeader";

export default {
  name: "TransactionExpenseSelect",
  components: {
    OmbSelect,
    SectionHeader
  },
  created() {
    this.$store.dispatch('fetchExpenses', this.period.now)
    this.$store.dispatch('fetchFreeMoney', this.period.now)
  },
  methods: {
    showExpenses() {
      this.$router.push({name: "transaction-edit-expense"})
    },
    getColor() {
      if(this.transaction.expense.id){
        return this.expenses.items[this.transaction.expense.id].color.hex
      } else {
        return "F5F5F5"
      }
    },
  },
  computed: {
    name() {
      return this.transaction.expense.id  ? this.transaction.expense.name : 'Свободные'
    },
    amount(){
      if(this.transaction.expense.id){
        if(this.expenses.items) {
          return this.expenses.items[this.transaction.expense.id].balance || this.default.amount
        } else {
          return this.default.amount
        }
      } else {
        return this.freeMoney.amount
      }
    },
    ...mapState({
      transaction: state => state.transaction.transaction,
      expenses: state => state.expenses,
      freeMoney: state => state.freeMoney,
      period: state => state.period
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
