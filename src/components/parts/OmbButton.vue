<template>
  <div class="omb-height d-flex omb-border-bottom flex-row justify-content-between flex-grow-1">
    <div>
      <input
          :type="type"
          class="omb-form-input flex-grow-1"
          :placeholder="placeholder"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
      />
    </div>
    <div class="omb-padding-icon" v-if="icon">
      <img :src="getIcon" alt="">
    </div>
  </div>

</template>

<script>

import { mapState } from "vuex";

export default {
  name: "OmbButton",
  props: {
    type: String,
    placeholder: String,
    value: String,
    icon: String
  },
  computed: {
    ...mapState({
      transaction: state => state.transaction
    }),
    getIcon() {
      return this.icons[this.icon]
    }
  },
}
</script>

<style lang="scss" scoped>
input {
  height: 54px;
}
</style>
