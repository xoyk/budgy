<template>
  <div>
    <Header></Header>
    <b-row no-gutters>
      <b-col lg="8">
        <AccountList />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Header from "../components/parts/Header";
import AccountList from "../components/AccountList";
import { mapState } from "vuex";

export default {
  name: "Account",
  components: {
    AccountList,
    Header
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.$store.dispatch("fetchPeriod", "current")
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
