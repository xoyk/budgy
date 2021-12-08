<template>
      <div class="d-flex flex-column flex-grow-1">
        <div class="transaction-title omb-text-headline">
          <span>
            Ура! Добавлен новый доход<br>«{{ item.name }}»
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
            <span id="expense-name">{{ item.name }}</span>
            <div>
              <span class="balance-prev">{{ itemPrev | currency }}</span>
              <span>{{ itemAmount | currency }}</span>
            </div>
          </div>
          <div class="d-flex flex-column">

            <span id="account-name">{{ accounts.items[transaction.account.receiver].name }}</span>

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
    itemAmount() {
      let result
      if(this.item){
        if(this.item.amount) {
          result = (this.item.amount - parseInt(this.transaction.amount) * 100) / 100
        } else {
          result = ""
        }
      }
      return result
    },
    itemPrev() {
      if(this.item){
        return this.item.amount / 100
      } else {
        return ""
      }

    },
    accountPrev() {
      return this.accounts.items[this.transaction.account.receiver].balance / 100
    },
    accountAmount(){
      return this.accounts.items[this.transaction.account.receiver].balance/100 + parseInt(this.transaction.amount)
    },
    incomeName(){
      console.log(this.transaction.income)
      console.log(this.incomes.items)
      console.log(this.incomes.items[this.transaction.income])
      console.log(this.incomes.items[this.transaction.income]['name'])
      if(this.transaction.income){
        return this.incomes.items[this.transaction.income]['name']
      } else {
        return "Прочие доходы"
      }
    },
    transactionAmount() {
      console.log('our radars show ' + this.transaction.amount)
      return parseInt(this.transaction.amount)
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
