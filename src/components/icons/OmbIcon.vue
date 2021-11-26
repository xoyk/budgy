<template>
  <div class="omb-icon d-flex justify-content-center align-items-center">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-if="name === 'shevron-down'"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: "OmbIcon",
  props: ['name']
}
</script>

<style scoped>
  .omb-icon {
    height: 48px;
    width: 48px;

  }
</style>
