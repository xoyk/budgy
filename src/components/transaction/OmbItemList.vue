<template>
  <div
      class="item-list text-left d-flex justify-content-between"
      @click="clicked(item)"
  >
    <div class="budgy-icon icon-expense"></div>
    <span class="item-list-name omb-text-body align-self-center flex-grow-1">{{ item.name }}</span>
    <span class="expense-balance omb-text-body align-self-center">{{ item.amount | currency }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  name: "OmbItemList",
  methods: {
    clicked() {
      this.$emit('clicked', )
    }
  }
}
</script>

<style scoped>

  .item-list {
    border-radius: 16px;
    padding: 12px 0;
    display: inline-block;
    line-height: 19px;
    column-gap: 8px;
  }
</style>
