<template>
    <div class="budgy-card omb-margin-1" v-if="freeMoney">
      <p class="title">{{ title }}</p>
      <span class="freeMoneyAmount">{{ formatAmount(freeMoney.amount / 100) }}</span>
      <p class="omb-text-caption omb-color-secondary">
        До конца периода осталось {{ this.stringHelpers.decl(period.current.days_to_the_end, ["день", "дня", "дней"]) }}
      </p>

      <progress :max="freeMoney.total" :value="freeMoney.total-freeMoney.spent"></progress>
      <div class="clearfix progress-title-container">
        <div class="float-left"><span class="omb-text-caption omb-color-tetriary">Потрачено {{ formatAmount(freeMoney.spent / 100) }}</span></div>
        <div class="float-right"><span class="omb-text-caption omb-color-tetriary">из {{ formatAmount(freeMoney.total / 100) }}
        </span></div>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FreeMoney",
  watch: {
    '$store.state.period': 'fetchData'
  },
  methods: {
    fetchData(){
      this.$store.dispatch('fetchFreeMoney', this.period.current.id)
    },
    formatAmount(amount) {
      return amount.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0})
    }
  },
  computed: {
    ...mapState(["freeMoney", "period"]),
    title() {
        return "Можно тратить"
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "src/assets/custom.scss";

  .budgy-card .title {
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 7px;
  }

  .progress-title-container {
    margin-top: -3px;
  }

  .budgy-card .sub-title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.3);
    line-height: 1;
  }

  .freeMoneyAmount {
    font-size: 45px;
    font-weight: bold;
    line-height: 53px;
  }

  progress[value] {
    /* Reset the default appearance */
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
  }

  progress::-moz-progress-bar {
    /* Reset the default appearance */
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
  }

  progress[value]::-webkit-progress-bar {
    background-color: $omb-text-primary2;
    border-radius: 16px;
    background-size: 35px 20px, 100% 100%, 100% 100%;
  }


    progress[value]::-moz-progress-bar {
    background-color: $omb-text-primary2;
    border-radius: 16px;
    background-size: 35px 20px, 100% 100%, 100% 100%;
  }

  progress[value]::-webkit-progress-value {
    background: linear-gradient($omb-button-primary-degree, $omb-button-primary-first, $omb-button-primary-second);
    border-radius: 16px;
  }

  progress[value]::-moz-progress-bar {
    background: linear-gradient($omb-button-primary-degree, $omb-button-primary-first, $omb-button-primary-second);
    border-radius: 16px;
  }

  progress {
    background-color: rgba(0, 0, 0, 0.04);
    direction: rtl;
    margin-top: 48px;
  }
</style>
