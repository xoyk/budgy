<template>
  <div id="drawer" class="panel-drawer">
    <div id="menu-container">
      <div id="menu-inner">
        <span v-for="(tab, index) in tabs" :key="index" :class="isActive(tab.code)" class="omb-text-headline menu-item" @click="changeTab(index)">
            {{ tab.text }}
        </span>
      </div>
    </div>
    <div id="transaction-fields" class="tab-content omb-grid-1 mb-3" v-if="period">
        <input
            id="transaction-date"
            v-model="formatted"
            type="text"
            autocomplete="off"
            class="omb-form-input"
            placeholder="Дата"
        >
          <b-form-datepicker
              id="datepicker"
              v-model="transaction.date"
              button-only
              right
              :start-weekday="1"
              :class="isActiveField()"
              :date-format-options="{ year: 'numeric', month: 'short', day: 'numeric' }"
              locale="ru-RU"
              aria-controls="example-input"
              today-button
              dropright
              offset="10"
              label-today-button="Сегодня"
              @context="onContext"
          ></b-form-datepicker>
        <input
            id="transaction-amount"
            v-model="transaction.amount"
            type="number"
            class="omb-form-input w-100"
            placeholder="Сумма"
        />
        <input
            id="transaction-name"
            class="flex-grow-1 omb-form-input w-100"
            v-model="transaction.name"
            type="text"
            :placeholder="this.fields.name"/>
      </div>
    <ExpenseDrawerTab v-if="currentTab === 'expense'"></ExpenseDrawerTab>
    <IncomeDrawerTab v-if="currentTab === 'income'"></IncomeDrawerTab>
    <SavingDrawerTab v-if="currentTab === 'saving'"></SavingDrawerTab>
    <TransferDrawerTab v-if="currentTab === 'transfer'"></TransferDrawerTab>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { mapState } from "vuex";
import ExpenseDrawerTab from "./tabs/ExpenseStart";
import IncomeDrawerTab from "./tabs/IncomeStart";
import SavingDrawerTab from "./tabs/SavingDrawerTab";
import TransferDrawerTab from "./tabs/TransferDrawerTab";
import moment from "moment";

export default {
  name: "TransactionDrawer",
  props: {
    type: String,
    settings: Object
  },
  components: {
    ExpenseDrawerTab,
    IncomeDrawerTab,
    SavingDrawerTab,
    TransferDrawerTab,
  },
  data() {
    return {
      show: true,
      tabs: [
        {
          text: "Расход",
          code: "expense",
          active: true,
          namePlaceholder: "Куда потратили"
        },
        {
          text: "Доход",
          code: "income",
          namePlaceholder: "Откуда пришло"
        },
        {
          text: "Накопление",
          code: "saving",
          namePlaceholder: "Название"
        },
        {
          text: "Трансфер",
          code: "transfer",
          namePlaceholder: "Название"
        }
      ],
      formatted: "",
      fields: {
        name: "Куда потратили"
      }
    };
  },
  created() {
    this.$store.dispatch("fetchAccounts");
    if(this.transaction.id === this.settings.transactionId){
      this.formatted = moment(this.transaction.date).format('YYYY-MM-DD')
    }

    if(this.settings.transactionId === "new") {
      this.formatted = moment(Date.now()).format("[Сегодня], DD MMMM")
    }
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
    presentDrawer() {
      //setTimeout(() => this.drawer.present({animate: true}));
      this.drawer.present({animate: true});
    },
    destroyDrawer() {
      this.drawer.destroy({animate: true});
    },
    hideDrawer() {
      this.drawer.hide();
      this.$store.dispatch('fetchExpenses', this.period.now)
    },
    isHiddenDrawer() {
    },
    fetchData() {
      this.$store.dispatch("fetchExpenses", this.period.now);
    }
  },
  computed: {
    ...mapState(['expenses', 'incomes', 'period', 'drawer']),
    ...mapState('transaction', ["transaction", "transactions2"])
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

  #transaction-name {
    grid-area: name;
  }

  #transaction-date {
    grid-area: date;
    color: $omb-color-primary;
  }

  #datepicker {
    grid-area: datepicker;
    background-color: transparent;
    box-shadow: none;
    border: none;
    border-radius: 0;
    color: $omb-color-primary;
  }

  #datepicker__outer_ {
    height: 64px;
  }

  #datepicker__outer_ button{
    padding-left: 0;
    padding-right: 0;
    //margin-top: 18px;
    height: 64px;
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
</style>

<style lang="scss" scoped>
@import "src/assets/custom.scss";
  #drawer-container {
    background-color: #FF8A00;
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
