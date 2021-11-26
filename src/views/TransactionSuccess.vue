<template>
  <div class="d-flex flex-column omb-margin-1" id="flex-0">
    <div id="flex-1">
        <div class="d-flex">
            <button class="budgy-icon-button" @click="cancel">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
        </div>
    </div>

    <div class="transaction-date omb-text-body omb-color-secondary" id="flex-2">
      <div>{{ formatDate(transaction.date) }}</div>
    </div>

    <div id="flex-5" class="flex-grow-1 d-flex">
      <ExpenseSuccess></ExpenseSuccess>
    </div>

    <div class="drawer-buttons d-flex justify-content-between" id="flex-4">
      <router-link :to="router" class="d-flex flex-grow-1" v-if="!transaction.account.source">
        <button class="flex-grow-1 omb-button-primary">{{ buttons.button2.text }}</button>
      </router-link>
      <div class="d-flex flex-grow-1" v-else>
        <button class="flex-grow-1 omb-button-primary" @click="nextStep">{{ buttons.button2.text }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ExpenseSuccess from "../components/steps/ExpenseSuccess";
import moment from "moment";

export default {
  name: "TransactionSuccess",
  data() {
    return {
      settings: {
        header: "Новая транзакция",
        show: true,
        mode: ""
      },
      buttons: {
        button1: {
          text: "Ещё транзакция"
        },
        button2: {
          text: "Отлично"
        }
      },
      formatted: moment(Date.now()).format("[Сегодня], DD MMMM"),
    }
  },
  props: {
    transactionId: String
  },
  components: {
    ExpenseSuccess
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
    isActive(tabCode) {
      if(tabCode === this.transaction.transactionType)
        return "active omb-color-primary"
    },
    cancel(){
      this.$store.dispatch("transaction/clearTransaction")
      this.$router.push({ name: "index"})
    },
    newItem() {
      return this.router
    },
    nextStep(){
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
    ...mapState(["period", "tabs"]),
  }
};
</script>

<style lang="scss">
  @import "../assets/custom.scss";
  #flex-0 {
    /*display: grid;*/
    /*!*grid-template-rows: [back-button] auto [transaction-date] auto [success-text] auto [image-part] 1fr [buttons] auto;*!*/
    /*grid-template-rows: [back-button] 25px [transaction-date] 30px [success-text] 80px [image-part] 1fr [buttons] auto;*/
    /*grid-template-columns: 100%;*/
    /*align-content: stretch;*/
    /*min-height: 100vh;*/
    /*padding-top: 24px;*/
    height: 100vh;
  }

  #flex-1 {
    align-self: start;
  }

  #flex-2 {
    align-self: center;
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
