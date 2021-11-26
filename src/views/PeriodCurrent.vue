<template>
  <div>
    <Period period-id="current"></Period>
  </div>
</template>

<script>
import Period from "./Period";
import { mapState } from "vuex";

export default {
  name: "PeriodCurrent",
  components: {
    Period
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.$store.dispatch("fetchPeriod", "current")
    if(!this.$store.state.buttons.add){
      this.$store.dispatch("setButtonState", {type: "add", status: true})
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchPeriod", "current")
    }
  },
  computed: {
    ...mapState(['period', 'buttons'])
  }
};
</script>

<style scoped>

</style>
