<template>
  <div v-if="savings.items">
    <h2>Сбережения <b-button
        v-b-modal="'planModalsaving'"
        v-if="editable"
        variant="success"
        id="transactionCreate"
        data-cy="create_saving_button"
        @click="setData()"
    >
      Добавить
    </b-button></h2>
    <table
        class="table table-striped table-bordered table-warning"
        id="expenseTable"
        data-cy="expense_list"
    >
      <thead class="thead-dark">
      <tr>
        <th colspan="3">Сбережения (итого: {{(savings.total / 100) | currency }})</th>
      </tr>
      </thead>
      <tbody>
      <tr
          class="savingRow saving_spent table-warning"
          v-for="saving in savings.active"
          :key="saving.id"
      >
        <td data-cy="saving_name">{{ saving.name }}</td>
        <td class="savingAmount" data-cy="saving_amount">
          {{ (saving.amount / 100) | currency }} / {{ (saving.balance / 100) | currency }}
        </td>
        <td v-if="editable" v-b-modal="'planModalsaving'" @click="setData(saving)">...</td>
      </tr>
      <tr
          class="savingRow saving_spent table-secondary"
          v-for="saving in savings.spend"
          :key="saving.id"
      >
        <td data-cy="saving_name">{{ saving.name }}</td>
        <td class="savingAmount" data-cy="saving_amount">
          {{ (saving.amount / 100) | currency }} / {{ (saving.balance / 100) | currency }}
        </td>
        <td v-if="editable" v-b-modal="'planModalsaving'" @click="setData(saving)">...</td>
      </tr>
      </tbody>
    </table>
    <PlanModal2 :period="period" type="saving" :editedItem="current"></PlanModal2>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import PlanModal2 from "@/components/PlanModal2";

export default {
  name: "SavingList",
  props: ["editable"],
  components: {
    PlanModal2
  },
  data() {
    return {
      current: {},
    }
  },
  computed: {
    ...mapState(["savings", "period"])
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  methods: {
    setData(saving) {
      this.current = saving
    },
    fetchData() {
      this.$store.dispatch('fetchSavings', this.period.current.id )
    }
  }
};
</script>

<style scoped></style>
