<template>
  <div v-if="incomes.items">
    <h2>Доходы <b-button
        v-b-modal="'planModalincome'"
        v-if="editable"
        variant="success"
        id="transactionCreate"
        data-cy="create_income_button"
        @click="setData()"
    >
      Добавить
    </b-button></h2>
    <table
        class="table table-striped table-bordered table-success"
        data-cy="income_list"
    >
      <thead class="thead-dark">
      <tr>
        <th colspan="3">
          Доходы (итого: {{ incomes.total }})
        </th>
      </tr>
      </thead>
      <tbody id="income_table">
      <tr
          data-cy="income_row"
          v-for="income in incomes.items.active"
          :key="income.id"
      >
        <td data-cy="income_name"><span v-if="income.received">✅ </span>{{income.name}}</td>
        <td data-cy="income_amount">{{ income.amount }}</td>
        <td v-if="editable" v-b-modal="'planModalincome'" @click="setData(income)">...</td>
      </tr>
      <tr
          data-cy="income_row"
          v-for="income in incomes.items.received"
          :key="income.id"
          class="table-secondary"
      >
        <td data-cy="income_name"><span v-if="income.received">✅ </span>{{income.name}}</td>
        <td data-cy="income_amount">{{ income.amount }}</td>
        <td v-if="editable" v-b-modal="'planModalincome'" @click="setData(income)">...</td>
      </tr>
      </tbody>
    </table>
    <PlanModal2 :period="period" type="income" :editedItem="current"></PlanModal2>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PlanModal2 from "@/components/PlanModal2";

export default {
  name: "IncomeList",
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
    ...mapState(["incomes", "period"])
  },
  methods: {
    setData(income) {
      this.current = income
    },
    fetchData() {
      this.$store.dispatch("fetchIncomes", this.period.current.id)
    }
  }
};
</script>

<style scoped></style>
