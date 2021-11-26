<template>
  <div data-cy="modal_transaction_income">
    <v-select
        label="name"
        size="lg"
        data-cy="income_selector"
        :options="incomes"
        v-model="form.income"
        :key="incomes.id"
    />
  </div>
</template>

<script>
import VSelect from "vue-select";
import { mapState } from "vuex";

export default {
  name: "IncomeSelect",
  components: {
    VSelect
  },
  computed: {
    ...mapState(["incomes"])
  }
};
</script>

<style scoped></style>
