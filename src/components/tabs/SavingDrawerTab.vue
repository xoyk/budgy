<template>
  <div class="d-flex flex-column flex-grow-1">
      <h3 class="sub_header">На что откладываем</h3>
      <SavingSelect2 :form="form"></SavingSelect2>
      <TransactionAccountSelect
          type="source"
          text="Чем платим"
          :default="accounts.default"
          v-if="accounts.default"
      />
      <TransactionAccountSelect text="На какой счет сохраняем" type="receiver" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
      <div class="flex-grow-1"></div>
      <TransactionButtons :buttons="buttons"></TransactionButtons>
  </div>
</template>

<script>
import {mapState} from "vuex";
import SavingSelect2 from "../selects/SavingSelect2";
import TransactionAccountSelect from "../transaction/TransactionAccountSelect";
import TransactionButtons from "../parts/TransactionButtons";

export default {
  name: "SavingDrawerTab",
  components: {
    TransactionAccountSelect,
    SavingSelect2,
    TransactionButtons
  },
  props: {
    form: Object
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
      }
    }
  },
  created() {
    this.transaction.transactionType = 'saving'
    this.transaction.type = 'saving'
    this.$store.dispatch('fetchSavings', this.period.now)
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchSavings', this.period.now)
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
    }
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
