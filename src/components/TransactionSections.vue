<template>
  <div id="menu-container">
    <div id="menu-inner" class="d-flex">
      <div v-for="item in items" :key="item.id" :class="item.code + ' ' + isActive(item.active) + ' menu-item'" @click="changeTab(item.id)">
        <span>
          {{ item.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TransactionSections",
  props: {
    currentTab: 0
  },
  components: {

  },
  data() {
    return {
      items: [
        {
          text: "Расход",
          code: "expense",
          active: true
        },
        {
          text: "Доход",
          code: "income"
        },
        {
          text: "Накопление",
          code: "saving"
        },
        {
          text: "Трансфер",
          code: "transfer"
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
    isActive(active) {
      if(active)
        return "active"
    },
    changeTab(tabIndex) {

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
