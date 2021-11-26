<template>
  <div>
    <header class="omb-margin-1">
      <PeriodInfo />

      <!--      <Debug />-->
    </header>
    <Sections />
  </div>

</template>

<script>
import PeriodInfo from "../PeriodInfo";
import Sections from "../Sections";

export default {
  name: "Header",
  components: {
    PeriodInfo,
    Sections
  }
}
</script>

<style scoped>

</style>
