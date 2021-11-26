<template>
  <div>
    <Header></Header>
    <b-row no-gutters>
      <b-col lg="4">
        <IncomeList />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import IncomeList from "../components/IncomeList";
import Header from "../components/parts/Header";
import { mapState } from "vuex";

export default {
  name: "Income",
  props: ["periodId"],
  components: {
    IncomeList,
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
