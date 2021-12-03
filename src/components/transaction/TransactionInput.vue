<template>
  <div class="omb-border-bottom">
    <input
      :type="type"
      class="omb-form-input w-100"
      :placeholder="placeholder"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
  />
  </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "TransactionInput",
  props: {
    type: String,
    placeholder: String,
    value: String
  },
  computed: {
    ...mapState({
      transaction: state => state.transaction
    })
  }
}
</script>

<style lang="scss" scoped>
  input {
    height: 54px;
  }
</style>
