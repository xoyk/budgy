<template>
  <div id="drawer" class="panel-drawer">
    <div id="menu-container">
      <div id="menu-inner">
        <span v-for="(tab, index) in tabs" :key="index" :class="isActive(tab.code)" class="omb-text-headline menu-item" @click="changeTab(index)">
            {{ tab.text }}
        </span>
      </div>
    </div>
    <div id="transaction-fields" class="tab-content omb-grid-1 mb-3" :class="transaction.transactionType" v-if="period">
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
      </div>
      <Buttons :button1="buttons.button1" :button2="buttons.button2" :router="router"></Buttons>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { mapState } from "vuex";
import moment from "moment";
import Buttons from "./parts/Buttons";

export default {
  name: "TransactionEditStep1",
  props: {
    type: String,
    settings: Object
  },
  components: {
    Buttons
  },
  data() {
    return {
      show: true,
      buttons: {
        button1: {
          text: "Назад",
          color: ""
        },
        button2: {
          text: "Далее",
          color: "",
          state: false,
          router: this.router
        },
      }
    };
  },
  created() {
    this.$store.dispatch("fetchAccounts");
    if(this.transaction.id === this.settings.transactionId){
      this.formatted = moment(this.transaction.date).format('YYYY-MM-DD')
    }

    if(this.settings.transactionId === "new") {
      moment.locale("ru-RU")
      this.formatted = moment(Date.now()).format("[Сегодня], DD MMMM")
    }
  },
  watch: {
    '$store.state.drawerState': 'presentDrawer',
    '$store.state.period': 'fetchData',
  },
  methods: {
    changeTab(index){
      this.$store.dispatch("setCurrentTab", this.tabs[index]['code'])
      this.fields.name = this.tabs[index]['namePlaceholder']
    },
    isActiveField(){
      if(this.transaction.date !== ""){
        return "active"
      }
    },
    fetchData() {
      this.$store.dispatch("fetchExpenses", this.period.now);
    },
  },
  computed: {
    ...mapState(['expenses', 'incomes', 'period', 'drawer', 'tabs', "currentTab"]),
    ...mapState('transaction', ["transaction", "transactions2"]),
    router() {
      return { name: 'transaction-edit-expense', params: { type: this.transaction.transactionType}}
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

  #transaction-name {
    grid-area: name;
  }

  #transaction-date {
    grid-area: date;
    color: $omb-color-primary;
  }

  #transaction-name, #transaction-amount {
    font-size: $omb-text-title;
    font-weight: bold;
  }

  #transaction-amount::placeholder, #transaction-name::placeholder {
    font-size: $omb-text-body;
    font-weight: normal;
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
    border-bottom: solid 1px $omb-color-tetriary !important;
  }

  #datepicker__outer_ button{
    padding-left: 0;
    padding-right: 0;
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
  }


</style>

<style lang="scss" scoped>
@import "src/assets/custom.scss";

  h2 {
    font-size: 28px;
    text-align: left;
    font-weight: bold;
  }

  .input-append {
    grid-template-columns: 1fr 56px;
    grid-template-rows: 1fr;
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
