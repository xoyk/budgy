<template>
  <table
    class="table table-striped table-bordered table-primary"
    id="statisticCategoryTable"
    data-cy="category_stat_list"
  >
    <thead class="thead-dark">
      <tr>
        <th colspan="2">
          Статистика расходов по категориям за период "{{ period.name }}"
        </th>
      </tr>
    </thead>
    <tbody v-for="category in categories" :key="category.idf">
      <tr>
        <td>{{ category.name }}</td>
        <td data-cy="category_amount">{{ category.count }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import BudgyService from "@/services/BudgyService";

export default {
  name: "StatCategoryList",
  created() {
    BudgyService.getStatCategory()
      .then(response => {
        this.categories = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  data() {
    return {
      categories: {},
      period: {
        "name": "Ноябрь 20"
      }
    };
  }
};
</script>

<style scoped></style>
