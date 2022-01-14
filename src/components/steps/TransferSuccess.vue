<template>
      <div class="d-flex flex-column flex-grow-1">
        <div class="transaction-title omb-text-headline">
          <span>
            Ура! Добавлен новый трансфер
          </span>
        </div>
        <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <div class="transaction-avatar d-flex justify-content-center flex-grow-1">
            <img src="/assets/man.svg" alt="Expense-image"/>
          </div>
          <div class="omb-text-headline-super">{{ transactionAmount | currency }}</div>
        </div>

        <TransactionBeforeAfter :resource="source" :account="account"></TransactionBeforeAfter>
      </div>
</template>

<script>
import {mapState} from "vuex";
import TransactionBeforeAfter from "../transaction/TransactionBeforeAfter";

export default {
  name: "TransferSuccess",
  components: {
    TransactionBeforeAfter
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchAccounts')
    },
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["period", "accounts"]),
    ...mapState("transaction", ["transaction"]),
    source() {
        return {
          name: this.transaction.account.source.name,
          before: this.transaction.account.source.balance / 100,
          after: (this.transaction.account.source.balance - parseFloat(this.transaction.amount.replace(/,/g, '.')) * 100) / 100,
        }
    },
    account() {
      return {
        name: this.transaction.account.receiver.name,
        before: this.transaction.account.receiver.balance / 100,
        after: (this.transaction.account.receiver.balance + parseFloat(this.transaction.amount.replace(/,/g, '.')) * 100) / 100,
      }
    },
    transactionAmount() {
      return parseFloat(this.transaction.amount.replace(/,/g, '.'))
    }
  }
};
</script>

<style>

</style>

<style lang="scss" scoped>
  @import "../../assets/custom.scss";

  input.active {
    font-weight: bold;
  }

  .transaction-title {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .omb-grid-4 {
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding: 24px 24px 24px 0;
    font-size: $omb-text-body;
    column-gap: 12px;
  }

  .omb-grid-5 {
    display: grid;
    justify-items: start;
    text-align: center;

  }

  .balance-prev {
    justify-self: start;
    text-decoration: line-through;
    padding-right: 4px;
    color: $omb-color-tetriary;
  }

  .omb-margin-4 {
    margin-bottom: 38px;
  }

  #expense-current {

  }

  #flex-5 {
    row-gap: 12px;
  }
</style>
