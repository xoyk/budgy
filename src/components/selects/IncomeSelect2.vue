<template>
  <div>
    <div id="income-list" class="d-flex flex-column" v-if="incomes.active">
      <div
          class="item-list d-flex justify-content-between"
          :class="{ active : transaction.income.id === income.id }"
          v-for="income in incomes.active"
          :key="income.id"
          @click="changeIncome(income)"
      >
        <div>{{ income.name }}</div>
        <div>{{ (income.amount / 100) | currency }}</div>
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
      if(this.transaction.income.id !== income.id) {
        this.transaction.income = income
        this.transaction.name = this.incomes.active[income.id].name
        this.transaction.amount = income.amount / 100
      } else {
        this.transaction.income = ""
      }
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
