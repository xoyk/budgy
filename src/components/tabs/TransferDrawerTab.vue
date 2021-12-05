<template>
  <div class="d-flex flex-column flex-grow-1">
    <div>
        <OmbInput type="number" v-model="transaction.amount" label="Сумма" id="amount"></OmbInput>
    </div>
    <div>
      <TransactionAccountSelect text="Откуда переводим" type="source" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
      <TransactionAccountSelect text="Куда переводим" type="receiver" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
    </div>
    <div class="flex-grow-1"></div>
    <TransactionButtons :buttons="buttons"></TransactionButtons>
  </div>
</template>

<script>
import {mapState} from "vuex";
import OmbInput from "../parts/OmbInput";
import TransactionAccountSelect from "../transaction/TransactionAccountSelect";
import TransactionButtons from "../parts/TransactionButtons";

export default {
  name: "TransferDrawerTab",
  components: {
    TransactionAccountSelect,
    OmbInput,
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
    this.transaction.transactionType = 'transfer'
    this.transaction.type = 'transfer'
    this.$store.dispatch('fetchAccounts', this.period.now)
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchAccounts', this.period.now)
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
    ...mapState(["period", "accounts"]),
    ...mapState("transaction", ["transaction"])

  },
};
</script>

<style lang="scss" scoped>

</style>
