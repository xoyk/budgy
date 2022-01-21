<template>
    <div class="drawer-buttons d-flex justify-content-between">
      <div class="flex-grow-1" @click="cancel" v-if="button1">
        <button id="first-button" class="omb-button-secondary">{{  button1.text }}</button>
      </div>

      <div class="flex-grow-1">
        <button v-wave class="omb-button-primary" :class="button2.state === false ? 'disabled' : ''" @click="clickHandler">{{ button2.text }}</button>
      </div>
    </div>
</template>

<script>
export default {
  name: "Buttons",
  data() {
    return {
    }
  },
  props: {
    button1: Object,
    button2: Object
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    clickHandler() {
      this.$emit("clicked")
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/custom.scss";
.drawer-buttons {
  margin: 16px 0 $omb-margin 0;
  column-gap: 16px;
}

.drawer-buttons a:visited, .drawer-buttons a:hover  {
  text-decoration: none;
}
</style>
