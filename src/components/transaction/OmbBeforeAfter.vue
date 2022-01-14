<template>
  <div class="d-flex justify-content-between">
    <span id="item-name">{{ name }}</span>
    <div>
      <span class="item-balance-before">{{ before | currency }}</span>
      <span class="item-balance-after">{{ after | currency }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "OmbBeforeAfter",
  props: ['name', 'before', 'after'],
  components: {
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/custom.scss";

  .item-balance-before {
    justify-self: start;
    text-decoration: line-through;
    padding-right: 4px;
    color: $omb-color-tetriary;
  }
</style>
