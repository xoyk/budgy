<template>
  <div>

  </div>
</template>

<script>
import PeriodInfo from "@/components/PeriodInfo.vue";
import FreeMoney from "@/components/FreeMoney.vue";
import AccountList from "@/components/AccountList.vue";
import IncomeList from "@/components/IncomeList.vue";
import ExpenseList from "@/components/ExpenseList.vue";
import SavingList from "@/components/SavingList";
import { mapState } from 'vuex'

export default {
  name: "Money",
  components: {
    PeriodInfo,
    FreeMoney,
    AccountList,
    IncomeList,
    ExpenseList,
    SavingList
  },
  computed: {
    ...mapState(["period"])
  }
};
</script>

<style scoped></style>
