<template>
  <div id="menu-container" v-if="period">
    <div id="menu-inner" class="d-flex">
      <div v-for="item in items" :key="item.id" :class="item.route + ' ' + isActive(item.route) + ' menu-item'">
        <router-link :to="{ name: item.route, params: {periodId: period.current.id} }">
          {{ item.text }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sections",
  data() {
    return {
      items: [
        {
          text: "Как дела",
          route: "period"
        },
        {
          text: "Расходы",
          route: "expense"
        },
        {
          text: "Доходы",
          route: "income"
        },
        {
          text: "Накопления",
          route: "saving"
        },
        {
          text: "Счета",
          route: "account"
        }
      ]
    }
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  methods: {
    fetchData(){
      this.$store.dispatch('fetchFreeMoney', this.period.current.id)
    },
    formatAmount(amount) {
      return amount.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0})
    },
    isActive(name) {
      if(this.$route.name === name)
        return "active"
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
    margin: 24px 0 24px 24px;
    overflow: hidden;
    white-space: nowrap;
  }

  #menu-inner {
    visibility: visible;
    overflow-x: scroll;
  }

  #menu-inner::-webkit-scrollbar {
    display: none;
  }

  .menu-item {
    padding: 8px 16px;
    margin-right: 4px;
    font-weight: 500;
    line-height: 18px;
  }

  .menu-item a {
    color: black;
    text-decoration: none;
  }

  .menu-item.active a {
    color: #FFFFFF;
  }

  .menu-item.active {
    background-color: black;
    border-radius: 16px;
  }
</style>
