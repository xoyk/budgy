<template>
  <table
    class="table table-striped table-bordered"
    id="statisticCategoryTable"
    data-cy="category_stat_list"
  >
    <thead class="thead-dark">
      <tr>
        <th>
          Текущий период
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <label for="statisticPeriod"></label>
          <select
            id="statisticPeriod"
            name="statisticPeriod"
            class="selectpicker form-control show-tick"
            data-live-search="true"
            data-width="auto"
            data-style="btn-danger"
            data-cy="statistic_period"
          >
            <option
              :value="period.id"
              v-for="period in periods"
              :key="period.id"
              :period="period"
              >{{ period.name }}</option
            >
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import BudgyService from "@/services/BudgyService";

export default {
  name: "PeriodSelector",
  created() {
    BudgyService.getPeriods()
      .then(response => {
        this.periods = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });

  },
  mounted() {
    console.log(this.$el);
  },
  data() {
    return {
      periods: {}
    };
  }
};
</script>

<style scoped></style>
