<template>
    <div id="menu-inner" class="d-flex">
      <div v-for="item in items" :key="item.id" :class="item.route + ' ' + isActive(item) + ' menu-item'">
        <router-link v-if="period && item.route" :to="{ name: item.route, params: {periodId: period.current.id} }">
          {{ item.text }}
        </router-link>
        <span v-else @click="changeTab">
          {{ item.text }}
        </span>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Tabs",
  props: {
    items: Array,
    activeTab: String
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  methods: {
    fetchData(){
      this.$store.dispatch('fetchFreeMoney', this.period.current.id)
    },
    isActive(item) {

      if(this.$route.name === item.name || item.active)
        return "active"
    },
    changeTab() {
      console.log('tab clicked!')
    }
  },
  computed: {
    ...mapState(["freeMoney", "period"]),
    title() {
        return "Можно тратить"
    },
  }
};
</script>

<style scoped>
  #menu-inner {
    visibility: visible;
    overflow-x: scroll;
    padding-left: 16px;
  }

  #menu-inner::-webkit-scrollbar {
    display: none;
  }

</style>
