<template>
  <footer>
    <router-link to="/transaction/new">
      <ButtonDrawer text="Добавить транзакцию" ref="drawer"></ButtonDrawer>
    </router-link>
  </footer>
</template>

<script>

import ButtonDrawer from "./ButtonDrawer"
import { mapState } from "vuex"

export default {
  name: "Footer",
  components: {
    ButtonDrawer
  },
  computed: {
    ...mapState(["buttons"])
  }
}
</script>

<style scoped>

</style>
