<template>
  <div
      class="item-list text-left d-flex justify-content-between"
      @click="clicked(item)"
  >
    <BudgyItemIcon :item="item"/>
    <span class="item-list-name omb-text-body align-self-center flex-grow-1">{{ item.name }}</span>
    <span class="expense-balance omb-text-body align-self-center">{{ item.balance / 100 | currency }}</span>
  </div>
</template>

<script>
import BudgyItemIcon from "../parts/BudgyItemIcon";

export default {
  props: {
    item: Object
  },
  components: {
    BudgyItemIcon
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
