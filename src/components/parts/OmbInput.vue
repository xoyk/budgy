<template>
  <div class="omb-height d-flex omb-border-bottom flex-row justify-content-between flex-grow-1">
    <div class="d-flex flex-column">
      <label class="align-self-start omb-text-caption omb-color-tetriary" v-if="label">{{ label }}</label>
      <input
          :type="type"
          class="omb-form-input flex-grow-1"
          :placeholder="placeholder"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
      />
    </div>
    <div class="omb-padding-icon" v-if="icon" @click="clicked()">
      <OmbIcon :icon="icon"></OmbIcon>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
import OmbIcon from "@/components/parts/OmbIcon";

export default {
  name: "OmbInput",
  components: {
    OmbIcon
  },
  props: {
    type: String,
    placeholder: String,
    value: String,
    icon: String,
    label: String
  },
  methods: {
    clicked() {
      this.$emit('clicked')
    }
  },
  computed: {
    ...mapState({
      transaction: state => state.transaction
    })
  },
}
</script>

<style lang="scss" scoped>
  input {
    height: 38px;
  }
</style>
