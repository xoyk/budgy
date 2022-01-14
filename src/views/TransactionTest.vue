<template>
  <div class="" id="grid-pedigree">
    <div id="fff"><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>
    <div><input type="text"></div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "TransactionTest",
  data() {
    return {
      settings: {
        header: "Новая транзакция",
        show: true,
        mode: ""
      },
      buttons: {
        button1: {
          text: "Карандашик"
        },
        button2: {
          text: "Добавить ещё транзакцию"
        }
      },
      formatted: moment(Date.now()).format("[Сегодня], DD MMMM"),
    }
  },
  props: {
    transactionId: String
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  created() {
    console.log(this.transactionId)
    this.settings.transactionId = this.transactionId

    if(this.$store.state.buttons.add){
      this.$store.dispatch("setButtonState", {type: "add", status: false})
    }
  },
  methods: {
    edit() {

    },
    formatDate(date){
      moment.locale('ru')
      return moment(date, 'YYYYMMDD').format('D MMMM')
    },
    fetchData() {

    },
    isActive(tabCode) {
      if(tabCode === this.transaction.type)
        return "active omb-color-primary"
    },
    cancel(){
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
    formatAmount(amount, maxFraction = 0) {
      return amount.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: maxFraction})
    },
  },
  computed: {
    router () {
      return { name: 'transaction', params: { transactionId: "new"}}
    },
    ...mapState("transaction", ["transaction"]),
    ...mapState(["period", "tabs"]),
  }
};
</script>

<style>

</style>

<style scoped lang="scss">
@import "../assets/custom.scss";
  #grid-pedigree {
    display: grid;
  }


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
    margin-left: 24px;
    margin-top: 11px;
  }

  header div {
    flex-basis: 48px;
    height: 48px;
  }

</style>
