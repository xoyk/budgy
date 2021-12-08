<template>
  <div class="d-flex flex-column flex-grow-1">
    <div>
        <OmbInput type="text" v-model="transaction.amount" label="Сумма" id="amount"></OmbInput>
    </div>
    <div>
      <TransactionAccountSelect text="Откуда переводим" type="source" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
      <TransactionAccountSelect text="Куда переводим" type="receiver" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
    </div>
    <div class="flex-grow-1"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import OmbInput from "../parts/OmbInput";
import TransactionAccountSelect from "../transaction/TransactionAccountSelect";

export default {
  name: "TransferDrawerTab",
  components: {
    TransactionAccountSelect,
    OmbInput
  },
  props: {
    form: Object
  },
  created() {
    this.transaction.transactionType = 'transfer'
    this.transaction.type = 'transfer'
    this.$store.dispatch('fetchAccounts', this.period.now)
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchAccounts', this.period.now)
    }
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["period", "accounts"]),
    ...mapState("transaction", ["transaction"])

  },
};
</script>

<style lang="scss" scoped>

</style>
