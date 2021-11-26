<template>
  <div class="omb-margin-2">
    <div class="d-flex">
        <div class="budgy-icon-button" @click="clicked()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackButton",
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
  }
</style>
