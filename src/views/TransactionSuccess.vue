<template>
  <div class="d-flex flex-column omb-margin-1 omb-layout-height100">
    <div class="transaction-date omb-text-body omb-color-secondary d-flex" id="flex-2">
      <div>{{ formatDate(transaction.date) }}</div>
    </div>

    <div id="flex-5" class="flex-grow-1 d-flex">
      <ExpenseSuccess v-if="transaction.type === 'expense'"></ExpenseSuccess>
      <IncomeSuccess v-if="transaction.type === 'income'"></IncomeSuccess>
      <SavingSuccess v-if="transaction.type === 'saving'"></SavingSuccess>
      <TransferSuccess v-if="transaction.type === 'transfer'"></TransferSuccess>
    </div>

    <SuccessButtons :buttons="buttons" v-on:clicked="ok()"></SuccessButtons>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ExpenseSuccess from "../components/steps/ExpenseSuccess";
import IncomeSuccess from "../components/steps/IncomeSuccess";
import SavingSuccess from "../components/steps/SavingSuccess";
import moment from "moment";
import SuccessButtons from "../components/parts/SuccessButtons";
import TransferSuccess from "../components/steps/TransferSuccess";

export default {
  props: {
    transactionId: String
  },
  name: "TransactionSuccess",
  components: {
    SavingSuccess,
    ExpenseSuccess,
    IncomeSuccess,
    SuccessButtons,
    TransferSuccess
  },
  data() {
    return {
      settings: {
        header: "Новая транзакция",
        show: true,
        mode: ""
      },
      buttons: {
        button2: {
          text: "Отлично"
        }
      },
      formatted: moment(Date.now()).format("[Сегодня], DD MMMM"),
    }
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  created() {

    if(this.transaction.type === 'expense'){
      console.log(this.transaction.type)
    }

    // this.settings.transactionId = this.transactionId

    // if(this.transactionId !== "new"){
    //   this.$store.dispatch("transaction/fetchTransaction", this.transactionId)
    // } else {
    //   this.$store.dispatch("fetchPeriod", "current")
    // }

    // if(this.$store.state.buttons.add){
    //   this.$store.dispatch("setButtonState", {type: "add", status: false})
    // }
  },
  methods: {
    formatDate(date){
      moment.locale('ru')
      return moment(date, 'YYYYMMDD').format('D MMMM')
    },
    fetchData() {
      this.$store.dispatch("fetchAccounts", this.period.now)
      this.$store.dispatch("fetchExpenses", this.period.now)
    },
    ok(){
      this.$store.dispatch("transaction/clearTransaction")
      this.$router.push({ name: "index"})
    },
    isActiveField(){
      if(this.transaction.date !== ""){
        return "active"
      }
    },
    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      if(ctx.selectedFormatted !== "No date selected")
        this.formatted = ctx.selectedFormatted

      // The following will be an empty string until a valid date is entered
      if(ctx.selectedYMD)
        this.transaction.date = ctx.selectedYMD
    },
  },
  computed: {
    router () {
      return { name: 'transaction', params: { transactionId: "new"}}
    },
    ...mapState("transaction", ["transaction"]),
    ...mapState(["period"]),
  }
};
</script>

<style lang="scss">
  @import "../assets/custom.scss";
  #flex-0 {
    height: 100vh;
  }

  #flex-1 {
    align-self: start;
  }

  #flex-2 {
    align-self: center;
    align-items: center;
    height: 43px;
  }

  #flex-4 {
    margin-bottom: 24px;
  }

  #flex-5 {

  }
</style>

<style scoped lang="scss">
  @import "../assets/custom.scss";
  // transaction type tabs //START
  #menu-container {
    height: 65px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    clear: both;
    text-align: left;
    margin-bottom: 13px;
    vertical-align: middle;
  }

  #menu-inner {
    visibility: visible;
    overflow-x: scroll;
    margin-right: 0;
    padding-left: 24px;
    padding-right: 24px;
  }

  #menu-inner > span {
    display: inline-block;
    vertical-align: middle;
  }

  #menu-inner::-webkit-scrollbar {
    display: none;
  }

  .menu-item:hover {
    cursor: pointer;
  }

  .menu-item {
    line-height: 135%;
    color: $omb-color-tetriary;
    text-decoration: none;
    padding-top: 15px;
    padding-left: 2px;
    padding-bottom: 10px;
    padding-right: 2px;
  }

  .menu-item:not(:last-child) {
    margin-right: 24px;
  }

  .menu-item.active {
    color: $omb-color-primary;
  }
  // transaction type tabs //END

  .omb-grid-1 {
    display: grid;
    grid-template-areas:
        "date datepicker";
    grid-template-rows: 64px;
    grid-template-columns: 1fr 56px;
    grid-row-gap: 16px;
  }

  .transaction-date {
    align-self: baseline;
    margin-left: 0;
    margin-top: 11px;
  }

  .drawer-buttons #flex-4 > button {
    height: 48px;
    border-radius: $omb-border-radius !important;
    width: 100%;
  }

</style>
