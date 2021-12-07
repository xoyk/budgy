<template>
  <div>
    <h2>Расходы <b-button
        v-b-modal="'planModalexpense'"
        v-if="editable"
        variant="success"
        id="transactionCreate"
        data-cy="create_expense_button"
        @click="setData()"
    >
      Добавить
    </b-button></h2>
    <table
        class="table table-striped table-bordered table-danger"
        id="expenseTable"
        data-cy="expense_list"
        v-if="expenses.items"
    >
      <thead class="thead-dark">
      <tr>
        <th colspan="3">Расходы (итого: {{ expenses.total / 100 }})</th>
      </tr>
      </thead>
      <tbody>
      <tr
          class="expenseRow expense_spent table-danger"
          v-for="expense in expenses.active"
          :key="expense.id"
      >
        <td data-cy="expense_name">{{ expense.name }}</td>
        <td class="expenseAmount" data-cy="expense_amount">
          {{ expense.amount / 100 }} / {{ expense.balance / 100 }}
        </td>
        <td v-if="editable" v-b-modal="'planModalexpense'" @click="setData(expense)">...</td>
      </tr>
      <tr
          class="expenseRow expense_spent table-secondary"
          v-for="expense in expenses.spend"
          :key="expense.id"
      >
        <td data-cy="expense_name">{{ expense.name }}</td>
        <td class="expenseAmount" data-cy="expense_amount">
          {{ expense.amount / 100 }} / {{ expense.balance / 100 }}
        </td>
        <td v-if="editable" v-b-modal="'planModalexpense'" @click="setData(expense)">...</td>
      </tr>
      </tbody>
    </table>
    <PlanModal2 :period="period" type="expense" :editedItem="current"></PlanModal2>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import PlanModal2 from "@/components/PlanModal2";

export default {
  name: "ExpenseList",
  props: ["editable"],
  components: {
    PlanModal2
  },
  data() {
    return {
      current: {},
    }
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
    ...mapState(["expenses", "period"])
  },
  methods: {
    setData(expense) {
      this.current = expense
    },
    fetchData() {
      this.$store.dispatch('fetchExpenses', this.period.current.id )
    }
  }
};
</script>

<style scoped>
  .spend {
    color: #ababab;
  }
</style>
