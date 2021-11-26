<template>
  <div>
    <BackButton v-on:clicked="back"/>
    <ExpenseSelect2 class="tab-content"></ExpenseSelect2>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ExpenseSelect2 from "../selects/ExpenseSelect2";
import BackButton from "../parts/BackButton";

export default {
  name: "ExpenseSource",
  components: {
    ExpenseSelect2,
    BackButton
  },
  data() {
    return {
      saving: false
    }
  },
  created() {
    this.$store.dispatch('fetchPeriod', "current")
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchExpenses', this.period.now)
      this.$store.dispatch('fetchAccounts', this.period.now)
    },
    switchToggle() {
      this.saving = !this.saving
    },
    back(){
      this.$router.push('/transaction/new')
    },
    nextStep(event) {
      event.preventDefault();
      this.$store
          .dispatch("transaction/saveTransaction", this.transaction)
          .then(() => {
            this.$router.push({name: "transaction-success", params: {type: this.transaction.type} })
            // this.$store.dispatch("transaction/clearTransaction")
          })
          .catch(() => {});
    },
  },
  watch: {
    '$store.state.period': 'fetchData',
  },
  computed: {
    ...mapState(["expenses", "period", "accounts"]),
    ...mapState({
          transaction: state => state.transaction.transaction
    }),
    router() {
      return { name: 'transaction-edit-account', params: { type: this.transaction.type}}
    },
  }
};
</script>

<style>

</style>

<style lang="scss" scoped>
  ::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  button#transactionDate {
    border-radius: 16px;
    height: 52px;
  }

  h3 {
    margin-bottom: 24px;
  }
</style>
