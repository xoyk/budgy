<template>
  <footer>
    <div id="buttons">
      <Buttons :button1="buttons.button1" :button2="buttons.button2" v-on:clicked="clickHandler"></Buttons>
    </div>
  </footer>
</template>

<script>

import Buttons from "./Buttons";
export default {
  name: "TransactionButtons",
  props: {
    buttons: Object
  },
  components: {
    Buttons
  },
  methods: {
    clickHandler() {
      this.$emit("clicked")
    }
  }
}
</script>

<style scoped>
  footer {
    height: 76px;
  }
</style>
