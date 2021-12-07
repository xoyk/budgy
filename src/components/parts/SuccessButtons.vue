<template>
  <footer>
    <div id="buttons">
      <Buttons :button2="buttons.button2" v-on:clicked="clickHandler"></Buttons>
    </div>
  </footer>
</template>

<script>

import Buttons from "./Buttons";
export default {
  name: "SuccessButtons",
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

  #buttons {
    margin: 0 24px;
  }
</style>
