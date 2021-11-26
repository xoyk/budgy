<template>
  <div>
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

    <div id="transaction-fields" v-if="period" class="omb-margin-1">
      <div class="omb-grid-1 omb-margin-bottom">
        <ExpenseStart v-if="transaction.type === 'expense'"></ExpenseStart>
        <IncomeStart v-if="transaction.type === 'income'"></IncomeStart>
        <SavingDrawerTab v-if="transaction.transactionType === 'saving'"></SavingDrawerTab>
        <TransferDrawerTab v-if="transaction.transactionType === 'transfer'"></TransferDrawerTab>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ExpenseStart from "../components/tabs/ExpenseStart";
import IncomeStart from "../components/tabs/IncomeStart";
import SavingDrawerTab from "../components/tabs/SavingDrawerTab";
import TransferDrawerTab from "../components/tabs/TransferDrawerTab";
import TransactionTypeSelect from "../components/transaction/TransactionTypeSelect";
import BackButton from "../components/parts/BackButton";

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
      formatted: ""
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
    BackButton
  },
  created() {
    this.settings.transactionId = this.transactionId
    moment.locale('ru')

    if(!this.transaction.date){
      this.transaction.date = moment(Date.now()).format("YYYY-MM-DD")
    }

    this.formatted = this.transaction.date ? this.transaction.date : moment(Date.now()).format("[Сегодня, ]YYYY-MM-DD")

    if(this.transactionId !== "new"){
      this.$store.dispatch("transaction/fetchTransaction", this.transactionId)
    } else {
      this.$store.dispatch("fetchPeriod", "current")
    }

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
    onContext(ctx) {
      moment.locale('ru')
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
      transaction: state => state.transaction.transaction
    }),
    ...mapState(["period", "buttons"]),
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