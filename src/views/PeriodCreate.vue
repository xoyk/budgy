
<template>
    <div class="omb-margin-1" v-if="periodStub.start_date">
      <div class="omb-padding-1">
        <button class="text-left budgy-icon-button" @click="close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="d-flex justify-content-between omb-margin-3 align-items-center">
        <div>{{ periodStub.start_date | datetime }} - {{periodStub.end_date | datetime }}</div>
        <div class="datepicker-grid justify-content-between">
          <b-form-datepicker
              id="datepicker"
              initial-date="2021-11-23"
              v-model="periodStub.end_date_formatted"
              button-only
              right
              :start-weekday="1"
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
      </div>
      <div class="budgy-card">
        Можно тратить
        <div class="omb-text-headline-super">
          {{ periodStub.free_money | currency }}
        </div>
        <div class="omb-text-caption omb-color-secondary">
          Период {{ numDays }}
        </div>
      </div>

      <div id="income-header" class="omb-toggle-header d-flex justify-content-start" @click="switchToggle('income')">
        <div class="flex-grow-1">Доходы</div>
        <div>{{ periodStub.incomes.total | currency }}</div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!toggles.income">
          <path d="M6 9L12 15L18 9" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="toggles.income">
          <path d="M18 15L12 9L6 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div id="income-list" class="d-flex flex-column align-items-left" v-if="toggles.income">
        <div
            v-for="income in periodStub.incomes.items"
            :key="income.name"
            :class="income.deleted"
            class="omb-item-list d-flex justify-content-between align-items-left omb-padding-1"
            @click="editItem(income, 'income')"
        >
          <div class="budgy-icon icon-income"></div>
          <div class="flex-grow-1 text-left">{{ income.name }}</div>
          <div>
            <div>{{ income.amount | currency }}</div>
            <div class="omb-text-caption omb-color-secondary">{{ income.account ? income.account.name : '' }}</div>
          </div>
        </div>
        <div>
          <button class="budgy-button style-2 flex-grow-1 text-left" @click="addItem('income')">+ Добавить доход</button>
        </div>
      </div>

      <div id="expenses" class="omb-toggle-header d-flex justify-content-start" @click="switchToggle('expense')">
        <div class="flex-grow-1">Расходы</div>
        <div>{{ periodStub.expenses.total | currency }}</div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!toggles.expense">
          <path d="M6 9L12 15L18 9" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="toggles.expense">
          <path d="M18 15L12 9L6 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div id="expense-list" class="d-flex flex-column align-items-left" v-if="toggles.expense">
        <div
            v-for="expense in periodStub.expenses.items"
            :key="expense.name"
            class="omb-item-list d-flex justify-content-between align-items-left omb-padding-1"
            @click="editItem(expense, 'expense')"
        >
          <div class="budgy-icon icon-income"></div>
          <div class="flex-grow-1 text-left">{{ expense.name }}</div>
          <div>
            <div>{{ expense.amount | currency }}</div>
          </div>
        </div>
      </div>

      <div id="savings" class="omb-toggle-header d-flex justify-content-between" @click="switchToggle('saving')">
        <div class="flex-grow-1">Накопления</div>
        <div>{{ periodStub.savings.total | currency }}</div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="!toggles.saving">
          <path d="M6 9L12 15L18 9" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="toggles.saving">
          <path d="M18 15L12 9L6 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div id="saving-list" class="d-flex flex-column align-items-left" v-if="toggles.saving">
        <div
            v-for="saving in periodStub.savings.items"
            :key="saving.name"
            class="omb-item-list d-flex justify-content-between align-items-left omb-padding-1"
            @click="editItem(saving, 'saving')"
        >
          <div class="budgy-icon icon-income"></div>
          <div class="flex-grow-1 text-left">{{ saving.name }}</div>
          <div>
            <div>{{ saving.amount | currency }}</div>
          </div>
        </div>
      </div>

      <div>
        <button class="budgy-button" @click="save">Сохранить</button>
      </div>

      <div id="income-pane" class="cupertino-pane hidden">
        <div class="pane-wrapper d-flex flex-column">
          <div>
            <div class="omb-text-caption omb-color-secondary">Название дохода</div>
            <input class="omb-form-input w-100" type="text" v-model="form.name">
          </div>
          <div>
            <div class="omb-text-caption omb-color-secondary">Сумма</div>
            <input class="omb-form-input w-100" type="text" v-model="form.amount">
          </div>

          <div class="d-flex" id="buttons2">
            <div class="budgy-button-short" @click="deleteItem('income')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 11V17" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 11V17" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
            <div class="budgy-button">
              <button class="budgy-button flex-grow-1" @click="saveItem('income')">Сохранить</button>
            </div>

          </div>

        </div>
      </div>

      <div id="expense-pane" class="cupertino-pane hidden">
        <div class="pane-wrapper d-flex flex-column">
          <div>
            <div class="omb-text-caption omb-color-secondary">Название расхода</div>
            <input class="omb-form-input w-100" type="text" v-model="form.name">
          </div>
          <div>
            <div class="omb-text-caption omb-color-secondary">Сумма</div>
            <input class="omb-form-input w-100" type="text" v-model="form.amount">
          </div>

          <button class="budgy-button" @click="saveItem('expense')">Сохранить</button>
        </div>
      </div>

      <div id="saving-pane" class="cupertino-pane hidden">
        <div class="pane-wrapper d-flex flex-column">
          <div>
            <div class="omb-text-caption omb-color-secondary">Название накопления</div>
            <input class="omb-form-input w-100" type="text" v-model="form.name">
          </div>
          <div>
            <div class="omb-text-caption omb-color-secondary">Сумма</div>
            <input class="omb-form-input w-100" type="text" v-model="form.amount">
          </div>

          <button class="budgy-button" @click="saveItem('saving')">Сохранить</button>
        </div>
      </div>
    </div>
</template>

<script>

import { mapState } from "vuex";
import { CupertinoPane } from 'cupertino-pane';

export default {
  name: "PeriodCreate",
  props: ["ancestor"],
  data() {
    return {
      toggles: {
        income: false,
        expense: false,
        saving: false
      },
      form: {
        name: "",
        amount: "",
        new: false
      },
      pane: ""
    }
  },
  created() {
    this.$store.dispatch("fetchPeriodStub")
  },
  methods: {
    close() {
      this.$router.go(-1)
    },
    editItem(item, type) {
      this.form.name = item.name
      this.form.amount = item.amount
      this.$store.dispatch("setStub", {type: type, item: item})
      this.pane = new CupertinoPane(
          '#' + type + '-pane', // Pane container selector
          {
            parentElement: 'body', // Parent container
            backdropOpacity: 0.3,
            backdrop: true,
            buttonClose: false,
            bottomClose: true,
            freeMode: true,
            fitHeight: true,
            breaks: {
              middle: { enabled: true, height: 300, bounce: true },
              bottom: { enabled: true, height: 80 },
            },
            onDrag: () => console.log('Drag event')
          }
      );
      this.pane.present({animate: true}).then(res => {
        console.log(res)
      });
    },
    switchToggle(type) {
      this.toggles[type] = !this.toggles[type]
    },
    save() {
      this.$store.dispatch("createPeriod", this.periodStub)
      .then((res) => {
        this.$router.push({
          name: 'period',
          params: { periodId: res.data.id }
        })
      })
      .catch(() => {});
    },
    saveItem(type) {
      if(type === 'income'){
        this.incomeStub.name = this.form.name
        if(this.form.amount !== this.incomeStub.amount){
          let diff = this.incomeStub.amount - this.form.amount
          let old = this.incomeStub.amount || 0
          this.incomeStub.amount = parseInt(this.form.amount)
          if(this.form.new){
            this.periodStub.incomes.items.push(this.form)
          }
          this.periodStub.free_money = this.periodStub.free_money + diff * -1
          this.periodStub.incomes.total = this.periodStub.incomes.total - old + this.incomeStub.amount
        }
      } else if(type === 'expense') {
        this.expenseStub.name = this.form.name
        if(this.form.amount !== this.expenseStub.amount){
          let diff = this.expenseStub.amount - this.form.amount
          let old = this.expenseStub.amount
          this.expenseStub.amount = parseInt(this.form.amount)
          this.periodStub.free_money = this.periodStub.free_money + diff
          this.periodStub.expenses.total = this.periodStub.expenses.total - old + this.expenseStub.amount
        }
      } else if(type === 'saving') {
        this.savingStub.name = this.form.name
        if (this.form.amount !== this.savingStub.amount) {
          let diff = this.savingStub.amount - this.form.amount
          let old = this.savingStub.amount
          this.savingStub.amount = parseInt(this.form.amount)
          this.periodStub.free_money = this.periodStub.free_money + diff
          this.periodStub.savings.total = this.periodStub.savings.total - old + this.savingStub.amount
        }
      }
      this.pane.destroy({animate: true})
    },
    addItem(type){
      if(type === 'income'){
        this.form.name = ""
        this.form.amount = null
        this.form.new = true

        this.pane = new CupertinoPane(
            '#' + type + '-pane', // Pane container selector
            {
              parentElement: 'body', // Parent container
              backdropOpacity: 0.3,
              backdrop: true,
              buttonClose: false,
              bottomClose: true,
              freeMode: true,
              fitHeight: true,
              breaks: {
                middle: { enabled: true, height: 300, bounce: true },
                bottom: { enabled: true, height: 80 },
              },
              onDrag: () => console.log('Drag event')
            }
        );
        this.pane.present({animate: true}).then(res => {
          console.log(res)
        });
      }
    },
    deleteItem(type){
      console.log(type)
      console.log(this.incomeStub )
      if(type === 'income'){
        this.incomeStub.deleted = true
      }
      this.pane.destroy({animate: true})
    },
    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      this.$store.state.periodStub.end_date = new Date(ctx.selectedYMD).getTime()/1000
      // if(ctx.selectedFormatted !== "No date selected")
      //   this.formatted = ctx.selectedFormatted
      //
      // // The following will be an empty string until a valid date is entered
      // if(ctx.selectedYMD)
      //   this.periodStub.end_date = ctx.selectedYMD
    }
  },
  computed: {
    ...mapState(['period', 'periodStub', 'incomeStub', 'expenseStub', 'savingStub']),
    numDays() {
      let diff = this.periodStub.end_date - this.periodStub.start_date
      let toHours = diff / 3600
      let toDays = Math.floor(toHours / 24)
      let total = toDays + 1
      return this.stringHelpers.decl(total, ["день", "дня", "дней"])
    }
  }
};
</script>
<style lang="scss">

</style>


<style lang="scss" scoped>
@import "src/assets/custom.scss";
  .omb-toggle-header {
    column-gap: 12px;
    text-align: left;
    padding: 16px 0;
  }

  #datepicker__outer_ {
    border-bottom: 0 !important;
  }

  #datepicker__outer_ > button#datepicker {
    padding: 0 !important;
  }

  .omb-item-list {
    column-gap: 8px;
  }

  .cupertino-pane {
    padding: 31px 21px;

  }

  .pane-wrapper {
    row-gap: 24px;
  }

  .budgy-button-short {
    background-color: $omb-bg-color-accent;
    border-radius: $omb-border-radius;
    padding: 12px;
    height: 48px;
  }

  #buttons2 {
    column-gap: 13px;
  }

.budgy-button {
  margin-bottom: 10px;
  font-size: 16px;
  border: 0;
  width: 100%;
  //border-radius: $omb-border-radius;
  border-radius: 24px;
  color: black;
  height: 48px;
  background: linear-gradient(91.47deg, #00FF38 4.17%, #00FFC2 93.62%);
}

.budgy-button.style-2 {
  background: #D9FFE3;
  border-radius: 16px;
  padding-left: 16px;
}

.deleted {
  background-color: #00FF38;
}
</style>
