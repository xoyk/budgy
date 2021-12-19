<template>
      <div class="d-flex flex-column flex-grow-1">
        <div class="transaction-title omb-text-headline">
          <span>
            Ура! Добавлен новый доход<br>«{{ transaction.name }}»
          </span>
        </div>
        <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <div class="transaction-avatar d-flex justify-content-center flex-grow-1">
            <img src="/assets/man.svg" alt="Expense-image"/>
          </div>
          <div class="omb-text-headline-super">{{ transactionAmount | currency }}</div>
        </div>

        <div id="flex-5" class="d-flex justify-content-between omb-margin-4 flex-column">
          <div class="d-flex flex-column" v-if="transaction.income">
            <span id="expense-name">{{ transaction.name }}</span>
            <div>
              <span class="balance-prev">{{ incomePrev | currency }}</span>
              <span>{{ incomeAmount | currency }}</span>
            </div>
          </div>
          <div class="d-flex flex-column">

            <span id="account-name">{{ transaction.account.receiver.name }}</span>

            <div>
              <span class="balance-prev">{{ accountPrev | currency }}</span>
              <span>{{ accountAmount | currency }}</span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "IncomeSuccess",
  methods: {
    fetchData() {
      this.$store.dispatch('fetchIncomes', this.period.now)
      this.$store.dispatch('fetchAccounts')
    },
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["incomes", "period", "accounts"]),
    ...mapState("transaction", ["transaction"]),
    item() {
        if(this.transaction.income){
          if(!this.incomes){
            this.$store.dispatch('fetchIncomes', this.period.now)
            return this.incomes.items[this.transaction.income]
          } else {
            return this.incomes.items[this.transaction.income]
          }
        } else {
          return {name: "Прочие доходы"}
        }
    },
    incomeAmount() {
      let result
      if(this.transaction.income.id){
        if(this.transaction.income.amount) {
          result = (this.transaction.income.amount - parseInt(this.transaction.amount) * 100) / 100
        } else {
          result = ""
        }
      }
      return result
    },
    incomePrev() {
      if(this.transaction.income.id){
        return this.incomes.items[this.transaction.income.id].amount / 100
      } else {
        return ""
      }
    },
    accountPrev() {
      return this.accounts.items[this.transaction.account.receiver.id].balance / 100
    },
    accountAmount(){
      return (this.accounts.items[this.transaction.account.receiver.id].balance + (parseFloat(this.transaction.amount.toString().replace(/,/g, '.')) * 100)) / 100
    },
    incomeName(){
      if(this.transaction.income.id){
        return this.transaction.income.name
      } else {
        return "Прочие доходы"
      }
    },
    transactionAmount() {
      return parseFloat(this.transaction.amount.toString().replace(/,/g, '.'))
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

  .transaction-avatar {
    background: rgba(0, 255, 91, 0.3);
    width: 120px;
    height: 120px;
    max-height: 120px;
    border-radius: 60px;
    margin-top: 38px;
    margin-bottom: 24px;
    align-items: center;
  }

  .transaction-avatar > img {
    width: 67px;
    height: 63px;
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
