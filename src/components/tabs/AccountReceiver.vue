<template>
  <div>
    <BackButton v-on:clicked="back"/>
    <AccountSelect2 account-type="receiver" class="tab-content"></AccountSelect2>
  </div>
</template>

<script>
import {mapState} from "vuex";
import AccountSelect2 from "../selects/AccountSelect2";
import BackButton from "../parts/BackButton";

export default {
  name: "AccountReceiver",
  components: {
    AccountSelect2,
    BackButton
  },
  created() {
    this.$store.dispatch('fetchPeriod', "current")
    this.transaction.type = 'expense'
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchAccounts')
    },
    back(){
      this.$router.push("/transaction/new")
    },
    nextStep() {
      event.preventDefault();
      this.$store
          .dispatch("transaction/saveTransaction", this.transaction)
          .then(() => {
            this.$router.push({name: "transaction-success", params: {type: this.transaction.transactionType} })
          })
          .catch(() => {});
    }
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["accounts", "period"]),
    ...mapState(
      {
        transaction: state => state.transaction
      }
    ),
    router() {
      return { name: 'transaction-success', params: { type: this.transaction.transactionType}}
    }
  },
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
