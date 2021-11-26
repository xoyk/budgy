<template>
  <h3 class="omb-text-title d-flex flex-column justify-content-center">{{ text }}</h3>
</template>

<script>
export default {
  name: "SectionHeader",
  props: ["text"]
}
</script>

<style lang="scss" scoped>
  h3 {
    height: 54px;
    margin-bottom: 0;
  }
</style>
