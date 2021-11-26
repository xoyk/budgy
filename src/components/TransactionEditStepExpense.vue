<template>
  <div id="drawer" class="panel-drawer">
    <div id="back-button">
      <button class="" @click="cancel">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <ExpenseDrawerTab v-if="transaction.type === 'expense'"></ExpenseDrawerTab>
    <IncomeDrawerTab v-if="transaction.transactionType === 'income'"></IncomeDrawerTab>
    <SavingDrawerTab v-if="transaction.transactionType === 'saving'"></SavingDrawerTab>
    <TransferDrawerTab v-if="transaction.transactionType === 'transfer'"></TransferDrawerTab>

<!--    <Buttons :button1="buttons.button1" :button2="buttons.button2" :router="router"></Buttons>-->

    <div class="drawer-buttons d-flex justify-content-between">
      <div class="d-flex flex-grow-1" @click="cancel">
        <button id="first-button" class="flex-grow-1 omb-button-secondary">{{  buttons.button1.text }}</button>
      </div>
      <div>
        <button class="flex-grow-1 omb-button-primary" @click="clickHandler">{{ buttons.button2.text }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { mapState } from "vuex";
import ExpenseDrawerTab from "./tabs/ExpenseStart";
import IncomeDrawerTab from "./tabs/IncomeStart";
import SavingDrawerTab from "./tabs/SavingDrawerTab";
import TransferDrawerTab from "./tabs/TransferDrawerTab";
// import Buttons from "./parts/Buttons";
// import moment from "moment";

export default {
  name: "TransactionEditStepExpense",
  components: {
    ExpenseDrawerTab,
    IncomeDrawerTab,
    SavingDrawerTab,
    TransferDrawerTab,
    // Buttons
  },
  data() {
    return {
      buttons: {
        button1: {
          text: "Назад",
          color: ""
        },
        button2: {
          text: "Готово",
          color: "",
          onclick: "save"
        },
      }
    };
  },
  created() {
    this.$store.dispatch("fetchAccounts")
    this.$store.dispatch("fetchPeriod", "current")
    console.log('call fetchExpenses in step 2')
    this.$store.dispatch("fetchExpenses", this.period)
  },
  watch: {
    '$store.state.drawerState': 'presentDrawer',
    '$store.state.period': 'fetchData',
  },
  methods: {
    changeTab(index){
      this.currentTab = this.tabs[index]['code']
      this.fields.name = this.tabs[index]['namePlaceholder']
    },
    isActive(tabCode) {
      if(this.transaction.type) {
        this.currentTab = this.transaction.type
      }

      if(tabCode === this.currentTab)
        return "active omb-color-primary"
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
    fetchData() {
      this.$store.dispatch("fetchExpenses", this.period.now);
      this.$store.dispatch("fetchFreeMoney", this.period.now);
    },
    cancel() {
      this.$router.push({path: "/"})
      this.$store.dispatch("setButtonState", {type: "add", status: true})
      this.$store.dispatch("transaction/clearTransaction")
    },
    save(event) {
      event.preventDefault();

      this.$store.dispatch("setButtonState", {type: "add", status: true})
      this.$store
          .dispatch("transaction/saveTransaction", this.transaction)
          .then(() => {
            this.$router.go(-1)
            this.$store.dispatch("transaction/clearTransaction")
          })
          .catch(() => {});
    },
    clickHandler() {
      this.$store.dispatch('transaction/saveTransaction', this.transaction)
      this.$router.push({ path: "/"})
      this.$store.dispatch("transaction/clearTransaction")
    }
  },
  computed: {
    ...mapState(['expenses', 'incomes', 'period', 'drawer', 'freeMoney']),
    ...mapState('transaction', ["transaction", "transactions2"]),
    router() {
      return undefined
    }
  },
};
</script>

<style lang="scss">
@import "src/assets/custom.scss";
  .input {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.04);
    margin-bottom: 16px;
  }

  .input input {
    display: block;
    background-color: transparent;
  }

  .input .icon {
    padding: 16px;
  }

  input:focus{
    outline: none !important;
    box-shadow:none !important;
  }

  .form-control {
    background-color: rgba(0, 0, 0, 0.04) !important;
    border: 0;
  }

  .input-group-append {
    margin-left: 0 !important;
  }

  .sub_header {
    clear: both;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    margin-top: 38px;
  }

  .more_link {
    padding: 16px;
  }
</style>

<style lang="scss" scoped>
@import "src/assets/custom.scss";
  #drawer-container {
    background-color: #FF8A00;
  }

  // кнопка Назад
  #back-button {
    text-align: left;
    margin-left: 24px;

  }

  #back-button button {
    background: transparent;
    padding: 0;
  }

  h2 {
    font-size: 28px;
    text-align: left;
    font-weight: bold;
  }

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

  .input-append {
    grid-template-columns: 1fr 56px;
    grid-template-rows: 1fr;
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

  ::placeholder {
    color: $omb-color-tetriary;
    font-size: $omb-text-body;
  }
  .active::placeholder {
    color: $omb-color-primary;
    font-size: $omb-text-body;
  }

</style>
