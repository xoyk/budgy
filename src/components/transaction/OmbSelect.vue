<template>
  <div id="omb-select" class="d-flex justify-content-start" @click="clicked()">
    <OmbIcon name="shevron-down"></OmbIcon>
    <div class="flex-grow-1 text-left">{{title}}</div>
    <div>{{ amount | currency }}</div>
  </div>
</template>

<script>
import OmbIcon from "../icons/OmbIcon"

export default {
  name: "OmbSelect",
  props: ['title', 'caption', 'amount', 'color'],
  components: {
    OmbIcon
  },
  methods: {
    clicked() {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/custom";
#omb-select {
  //background-color: #007bff;
  border-radius: 24px;
  border: 1px solid $omb-color-secondary;
  height: 56px;
  align-items: center;
  padding-left: 4px;
  padding-right: 16px;
}

.toggler {
  width: 48px;
}
</style>
