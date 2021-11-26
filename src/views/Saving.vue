<template>
  <div>
    <Header></Header>
    <b-row no-gutters>
      <b-col lg="4">
        <SavingList />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Header from "../components/parts/Header";
import SavingList from "../components/SavingList";
import { mapState } from "vuex";

export default {
  name: "Saving",
  props: ["periodId"],
  components: {
    SavingList,
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
