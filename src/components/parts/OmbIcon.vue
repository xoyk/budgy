<template>
  <img :src="getIcon" alt="">
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "OmbIcon",
  data() {
    return {
      icons: {
        eyeClosed: require('../../assets/icons/eye-closed.svg'),
        eyeOpen: require('../../assets/icons/eye-open.svg'),
        plus: require('../../assets/icons/plus.svg'),
        close: require('../../assets/icons/x.svg')
      }
    }
  },
  props: {
    icon: String
  },
  methods: {
    clicked() {
      this.$emit('clicked')
    }
  },
  computed: {
    ...mapState({
      transaction: state => state.transaction
    }),
    getIcon() {
      return this.icons[this.icon]
    }
  },
}
</script>

<style lang="scss" scoped>
input {
  height: 54px;
}
</style>
