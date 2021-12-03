<template>
  <div class="d-flex flex-column">
    <div
      class="item-list freeMoney text-left d-flex justify-content-between"
      @click="changeExpense(null)"
      :class="{ active : transaction.account.source === '' && transaction.expense === '' }"
      v-if="freeMoney"
      >
      <div class="budgy-icon color-freemoney"></div>
      <span class="item-list-name omb-text-body align-self-center flex-grow-1">Свободные</span>
      <span class="expense-balance omb-text-body align-self-center">{{ freeMoney.amount | currency }} </span>
    </div>

    <OmbItemList
        v-for="item in expensesActive"
        :key="item.id"
        :item="item"
        v-on:clicked="changeExpense(item)"
    >
    </OmbItemList>
  </div>
</template>
<script>

import { mapState } from "vuex";
import OmbItemList from "@/components/transaction/OmbItemList";

export default {
  name: "ExpenseSelect2",
  components: {
    OmbItemList
  },
  props: {
    accountType: String
  },
  data() {
    return {
      regular: [],
      saving: [],
      added: [],
      showAll: false
    }
  },
  created(){
    this.$store.dispatch("fetchFreeMoney", "current")
  },
  computed: {
    expensesActive() {
      return this.expenses.active
    },
    ...mapState(["expenses", "freeMoney"]),
    ...mapState("transaction", ["transaction"])
  },
  methods: {
    changeExpense(expense) {
      if(expense == null){
        this.transaction.expense = ""
      } else {
        this.transaction.expense = expense.id
      }

      this.$router.go(-1)
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/custom";
  // блоки-обертки
  #item-list-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    column-gap: 12px;
    row-gap: 12px;
    word-break: break-word;
  }
  // блоки-обертки END

  .item-list a {
    color: $omb-text-secondary;
    white-space: nowrap;
    margin: auto;
  }

  .item-list a:visited, .item-list2 a:hover {
    text-decoration: none;
  }

  .item-list-name {
    white-space: nowrap;
    padding-left: 8px;
    align-self: center;
  }

  .expense-balance {
    color: $omb-text-primary;
    white-space: nowrap;
  }

</style>
