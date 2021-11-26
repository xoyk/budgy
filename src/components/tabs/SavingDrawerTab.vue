<template>
  <div>
    <div>
      <h3 class="sub_header">На что откладываем</h3>
      <SavingSelect2 :form="form"></SavingSelect2>
      <TransactionAccountSelect
          type="source"
          text="Чем платим"
          :default="accounts.default"
          v-if="accounts.default"
      />
      <TransactionAccountSelect text="На какой счет сохраняем" type="receiver" :default="accounts.default" v-if="accounts.default"></TransactionAccountSelect>
      <div class="drawer-buttons d-flex justify-content-between">
        <div class="d-flex flex-grow-1" @click="cancel" v-if="buttons.button1">
          <button id="first-button" class="flex-grow-1 omb-button-secondary">{{  buttons.button1.text }}</button>
        </div>

        <div class="d-flex flex-grow-1">
          <button class="flex-grow-1 omb-button-primary" @click="save">{{ buttons.button2.text }}</button>
        </div>
      </div>
    </div>
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
