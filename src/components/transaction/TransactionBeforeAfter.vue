<template>
  <div id="flex-5" class="d-flex justify-content-between omb-margin-4 flex-column">
    <OmbBeforeAfter :name="resource.name" :before="resource.before" :after="resource.after"></OmbBeforeAfter>
    <OmbBeforeAfter :name="account.name" :before="account.before" :after="account.after"></OmbBeforeAfter>
  </div>
</template>

<script>
import OmbBeforeAfter from "./OmbBeforeAfter";

export default {
  name: "TransactionBeforeAfter",
  components: {
    OmbBeforeAfter,
  },
  props: {
    resource: Object,
    account: Object
  },
}
</script>

<style lang="scss" scoped>
  #flex-5 {
    row-gap: 12px;
  }

  .omb-margin-4 {
    margin-bottom: 38px;
  }
</style>
