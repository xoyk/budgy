<template>
  <div class="d-flex flex-column omb-layout-height100">
    <BackButton v-on:clicked="cancel" class="omb-margin-1"/>

    <div class="omb-margin-1">
      <div class="datepicker-grid justify-content-between">
        <b-form-datepicker
            id="datepicker"
            v-model="transaction.date"
            button-only
            right
            :start-weekday="1"
            :class="isActiveField()"
            :date-format-options="{ year: 'numeric', month: 'long', day: 'numeric' }"
            locale="ru-RU"
            aria-controls="example-input"
            today-button
            dropright
            offset="10"
            label-today-button="Сегодня"
            @context="onContext"
        ></b-form-datepicker>
        <input
            id="transaction-date"
            v-model="formatted"
            type="text"
            autocomplete="off"
            class="flex-grow-1 omb-form-input-2"
            placeholder="Дата"
        >
      </div>
    </div>

    <TransactionTypeSelect></TransactionTypeSelect>

    <div id="transaction-fields" v-if="period" class="omb-margin-1 flex-grow-1 d-flex">
        <ExpenseStart v-if="transaction.type === 'expense'"></ExpenseStart>
        <IncomeStart v-if="transaction.type === 'income'"></IncomeStart>
        <SavingDrawerTab v-if="transaction.type === 'saving'"></SavingDrawerTab>
        <TransferDrawerTab v-if="transaction.type === 'transfer'"></TransferDrawerTab>
    </div>
    <TransactionButtons :buttons="buttons" v-on:clicked="saveTransaction()"></TransactionButtons>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ExpenseStart from "../components/tabs/ExpenseStart";
import IncomeStart from "../components/tabs/IncomeStart";
import SavingDrawerTab from "../components/tabs/SavingDrawerTab";
import TransferDrawerTab from "../components/tabs/TransferDrawerTab";
import TransactionTypeSelect from "../components/transaction/TransactionTypeSelect";
import BackButton from "../components/parts/BackButton";
import TransactionButtons from "../components/parts/TransactionButtons";

import moment from "moment";
export default {
  name: "Transaction",
  data() {
    return {
      settings: {
        header: "Новая транзакция",
        show: true,
        mode: ""
      },
      formatted: "",
      buttons: {
        button2: {
          text: "Сохранить",
          color: "",
        },
      }
    }
  },
  props: {
    transactionId: String
  },
  components: {
    IncomeStart,
    SavingDrawerTab,
    TransferDrawerTab,
    ExpenseStart,
    TransactionTypeSelect,
    BackButton,
    TransactionButtons
  },
  watch: {
    // '$store.state.transaction.amount': 'normalizeAmount'
  },
  created() {
    moment.locale('ru')
    this.$store.dispatch("fetchPeriod", "current")
    this.$store.dispatch("fetchAccounts", "current")
    if(this.transactionId !== "new"){
      this.$store.dispatch("transaction/fetchTransaction", this.transactionId)
    }

    if(!this.transaction.date){
      this.transaction.date = moment(Date.now()).format("YYYY-MM-DD")
    } else {
      this.transaction.date = moment(this.transaction.date).format("YYYY-MM-DD")
    }

    this.formatted = this.transaction.date ? this.transaction.date : moment(Date.now()).format("[Сегодня, ]YYYY-MM-DD")

    if(this.$store.state.buttons.add){
      this.$store.dispatch("setButtonState", {type: "add", status: false})
    }
  },
  methods: {
    cancel(){
      this.$store.dispatch("setButtonState", {type: "add", status: true})
      this.$store.dispatch("transaction/clearTransaction")
      this.$router.push({name: "index"})
    },
    isActiveField(){
      if(this.transaction.date !== ""){
        return "active"
      }
    },
    saveTransaction(){
      if(!this.transaction.name){
        if(this.transaction.type !== "transfer"){
          this.transaction.name = this.transaction[this.transaction.type]['name'] || this.tabs[this.transaction.type].text
        } else {
          this.transaction.name = this.tabs.transfer.text
        }
      }

      this.$store.dispatch('transaction/saveTransaction', this.transaction)
          .then(() => {
            this.$router.push({name: "transaction-success", params: {type: this.transaction.type} })
          })
          .catch(() => {});
    },
    onContext(ctx) {
      moment.locale("ru")
      // The date formatted in the locale, or the `label-no-date-selected` string
      if(ctx.selectedFormatted !== "No date selected") {
        this.formatted = moment(ctx.selectedDate).format("DD MMMM")
        if(this.transaction.date === ''){
          this.formatted = moment(Date.now().format("[Сегодня], DD MMMM"))
        }
      }
      // The following will be an empty string until a valid date is entered
      if(ctx.selectedYMD)
        this.transaction.date = ctx.selectedYMD
    },
  },
  computed: {
    ...mapState({
      transaction: state => state.transaction.transaction,
      period: state => state.period,
      tabs: state => state.transaction.tabs
    }),
    ...mapGetters(['transaction/getTransactionById'])
  }
};
</script>

<style scoped lang="scss">
  .omb-grid-1 {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  .datepicker-grid {
    display: flex;
    column-gap: 12px;
  }

  #transaction-date {
    border-bottom: 0;
    height: 64px;
  }
</style>
