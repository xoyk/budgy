<template>
  <div>
    <Header></Header>
    <b-row no-gutters>
      <b-col lg="2">
      </b-col>
      <b-col lg="8">
        <FreeMoney />
        <TransactionList v-if="period" />
      </b-col>
      <b-col lg="2">

      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>

<script>
import TransactionList from "@/components/TransactionList.vue";
import FreeMoney from "@/components/FreeMoney.vue";
import Header from "../components/parts/Header";
import Footer from "../components/parts/Footer";
import { mapState } from "vuex";

export default {
  name: "Period",
  props: ["periodId"],
  components: {
    TransactionList,
    FreeMoney,
    Header,
    Footer
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.$store.dispatch("fetchPeriod", this.periodId)
    if(!this.$store.state.buttons.add){
      this.$store.dispatch("setButtonState", {type: "add", status: true})
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchPeriod", this.periodId)
    }
  },
  computed: {
    ...mapState(['period', 'buttons'])
  }
};
</script>

<style scoped>

</style>
