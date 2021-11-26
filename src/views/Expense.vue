<template>
  <div>
    <Header></Header>
    <b-row no-gutters>
      <b-col lg="4">
        <ExpenseList />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ExpenseList from "../components/ExpenseList.vue";
import Header from "../components/parts/Header";
import { mapState } from "vuex";

export default {
  name: "Expense",
  props: ["periodId"],
  components: {
    ExpenseList,
    Header
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.$store.dispatch("fetchPeriod", this.periodId)
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchPeriod", this.periodId)
    }
  },
  computed: {
    ...mapState(['period'])
  }
};
</script>

<style scoped>

</style>
