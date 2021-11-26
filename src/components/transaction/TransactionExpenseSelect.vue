<template>
  <div>
    <SectionHeader text="Откуда списываем"></SectionHeader>
    <OmbSelect :title="name" :amount="amount" v-on:clicked="showExpenses"></OmbSelect>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OmbSelect from "./OmbSelect";
import SectionHeader from "../parts/SectionHeader";

export default {
  props: {
    default: {
      amount: 0
    }
  },
  name: "TransactionExpenseSelect",
  components: {
    OmbSelect,
    SectionHeader
  },
  methods: {
    showExpenses() {
      this.$router.push('/transaction/new/expense')
    }
  },
  computed: {
    name() {
      if(this.expenses.items){
        return this.transaction.transaction.expense && this.expenses.items ? this.expenses.items[this.transaction.transaction.expense]['name'] : 'Свободные'
      } else {
        return 'Свободные'
      }

    },
    amount(){
      if(this.transaction.transaction.expense && this.expenses.items){
        return this.transaction.transaction.expense && this.expenses.items ? this.expenses.items[this.transaction.transaction.expense]['balance'] : this.default.amount
      } else {
        return this.freeMoney.amount
      }

    },
    ...mapState({
      transaction: state => state.transaction,
      expenses: state => state.expenses,
      freeMoney: state => state.freeMoney
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
