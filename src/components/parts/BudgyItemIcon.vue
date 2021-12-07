<template>
    <div class="budgy-icon align-self-center" :style="{backgroundColor: item.color ? '#' + item.color.hex : '#b9ecbb'}"></div>
</template>

<script>
export default {
  name: "BudgyItemIcon",
  props: {
    item: Object
  },
}
</script>

<style scoped>

</style>
