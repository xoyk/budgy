<template>
  <div>
    <div class="d-flex justify-content-end">
        <div class="budgy-icon-button" @click="clicked()">
          <div class="omb-padding-icon">
            <OmbIcon icon="close"></OmbIcon>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import OmbIcon from "@/components/parts/OmbIcon";

export default {
  name: "CloseButton",
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

<style scoped>
  .budgy-icon-button {
    border: 0;
    background: transparent;
    padding: 12px;
    padding-right: 0;
  }

  .omb-padding-icon {
    padding-right: 0;
  }
</style>
