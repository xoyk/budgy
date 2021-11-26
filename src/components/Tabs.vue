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

      if(this.$route.name == item.name || item.active)
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
  #menu-container {
    /*background-color: #FF21A6;*/
    height: 34px;
    margin: 24px 0;
    overflow: hidden;
    white-space: nowrap;
  }

  #menu-inner {
    visibility: visible;
    overflow-x: scroll;
    padding-left: 16px;
  }

  #menu-inner::-webkit-scrollbar {
    display: none;
  }

  .period {
    /*background-color: papayawhip;*/
  }

  .expenses {
    /*background-color: #dc3848;*/
    flex-grow: 0;
  }

  .incomes {
    /*background-color: #3c97cf;*/
  }

  .savings {
    /*background-color: darkmagenta;*/
  }

  .menu-item {
    padding: 8px 12px;
    margin-right: 4px;
    font-weight: 500;
    line-height: 18px;
  }

  .menu-item a {
    color: black;
    text-decoration: none;
  }

  .menu-item.active {
    color: #FFFFFF;
  }

  .menu-item.active {
    background-color: black;
    border-radius: 16px;
  }
</style>
