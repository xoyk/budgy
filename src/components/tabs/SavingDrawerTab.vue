<template>
  <div class="d-flex flex-column flex-grow-1">
      <h3 class="sub_header">На что откладываем</h3>
      <SavingSelect2></SavingSelect2>
      <TransactionAccountSelect
          type="source"
          text="Чем платим"
          :default="accounts.default"
          v-if="accounts.default"
      />
      <TransactionAccountSelect text="На какой счет сохраняем" type="receiver" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
      <div class="flex-grow-1"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import SavingSelect2 from "../selects/SavingSelect2";
import TransactionAccountSelect from "../transaction/TransactionAccountSelect";

export default {
  name: "SavingDrawerTab",
  components: {
    TransactionAccountSelect,
    SavingSelect2
  },
  created() {
    this.transaction.type = 'saving'
    this.$store.dispatch('fetchSavings', this.period.now)
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchSavings', this.period.now)
    },
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["savings", "period", "accounts"]),
    ...mapState("transaction", ["transaction"])
  },
};
</script>

<style lang="scss" scoped>

</style>
