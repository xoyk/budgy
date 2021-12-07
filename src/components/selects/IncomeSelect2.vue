<template>
  <div>
    <div id="income-list" class="d-flex flex-column" v-if="incomes.active">
      <div
          class="item-list d-flex justify-content-between"
          :class="{ active : transaction.income === income.id }"
          v-for="income in incomes.active"
          :key="income.id"
          @click="changeIncome(income)"
      >
        <div>{{ income.name }}</div>
        <div>{{ formatAmount(income.amount / 100) }}</div>
      </div>
    </div>
  </div>

</template>

<script>

import { mapState } from "vuex";

export default {
  name: "IncomeSelect2",
  props: {
    period: String,
    accountType: String
  },
  computed: {
    ...mapState(["incomes"]),
    ...mapState("transaction", ["transaction"])
  },
  methods: {
    changeIncome(income) {
      if(this.transaction.income !== income.id) {
        this.transaction.income = income.id
        this.transaction.name = this.incomes.active[income.id].name
        this.transaction.amount = income.amount / 100
      } else {
        this.transaction.income = ""
      }
    },
    formatAmount(amount) {
      return amount.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0})
    }
  },
};
</script>

<style lang="scss" scoped>
  #income-list {
    row-gap: 8px;
  }

  #income-list > .item-list {
    margin-right: 0;
    margin-bottom: 0;
  }

  .item-list.active {
    background-color: #eadd2b;
  }
</style>
