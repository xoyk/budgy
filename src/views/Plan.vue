<template>
  <div>
    <Header></Header>
    <b-row>
      <b-col lg="6">
        <FreeMoney :period="periodId"></FreeMoney>
        <ExpenseList :editable="true" :period="periodId"></ExpenseList>
      </b-col>
      <b-col lg="6">
        <IncomeList :editable="true" :period="periodId"></IncomeList>
        <SavingList :editable="true" :period="periodId"></SavingList>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ExpenseList from "@/components/ExpenseList";
import IncomeList from "@/components/IncomeList";
import SavingList from "@/components/SavingList";
import FreeMoney from "@/components/FreeMoney";
import Header from "../components/parts/Header";
import {mapState} from "vuex";

export default {
  name: "Plan",
  props: ["periodId"],
  data() {
    return {
      selectedType: "expense"
    }
  },
  created() {
      this.$store.dispatch("fetchPeriod", this.periodId)
  },
  components: {
    ExpenseList,
    IncomeList,
    SavingList,
    FreeMoney,
    Header
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    setModalType(type){
      this.selectedType = type
    },
    fetchData() {
      this.$store.dispatch("fetchPeriod", this.periodId)
    }
  },
  computed: {
    ...mapState(['period'])
  }
};
</script>

<style scoped></style>
