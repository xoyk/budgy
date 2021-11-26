<template>
  <div>
    <div>
      <TransactionInput type="number" placeholder="Сумма" v-model="transaction.amount"></TransactionInput>
    </div>
    <div>
      <TransactionAccountSelect text="Откуда переводим" type="source" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
      <TransactionAccountSelect text="Куда переводим" type="receiver" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
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
import TransactionInput from "../transaction/TransactionInput";
import TransactionAccountSelect from "../transaction/TransactionAccountSelect";

export default {
  name: "TransferDrawerTab",
  components: {
    TransactionAccountSelect,
    TransactionInput
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
