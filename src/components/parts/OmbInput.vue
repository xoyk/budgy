<template>
  <div class="omb-height d-flex omb-border-bottom flex-row justify-content-between flex-grow-1">
    <div class="d-flex flex-column flex-grow-1">
      <input
          :id="id"
          :type="type"
          class="omb-form-input flex-grow-1"
          v-bind:value="value"
          required
          v-on:input="$emit('input', $event.target.value)"
      />
      <label class="align-self-start omb-color-tetriary omb-label-margin" :for="id">
        <span>
          {{ label }}
        </span>
      </label>
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
    label: String,
    id: String
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
  @import "../../assets/custom.scss";

  #container {
    height: 56px;
  }
  input {
    height: 56px;
    overflow-x: hidden;
    background-color: transparent;
  }

  label.omb-label-margin {
    font: $omb-text-body;
    position: relative;
    white-space: nowrap;
    display: block;

  }

  label.omb-label-margin > span {
    font-family: "SF Pro Display", "Roboto", sans-serif;
    position: absolute;
    top: -32px;
    align-self: center;
    height: 56px;
    z-index: -1;
  }

  input + label.omb-label-margin > span
  {
    font-size: $omb-text-body;
  }

  input:focus + label > span,
  input:valid + label > span
  {
    top: -60px;
    transition: top 0.2s ease, font-size 0.2s ease;
    font-size: $omb-text-caption;
  }
</style>
