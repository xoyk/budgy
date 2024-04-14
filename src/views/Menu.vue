<template>
  <div class="omb-margin-1" v-if="period">
      <div class="omb-padding-1">
        <button class="budgy-icon-button text-left" @click="close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="omb-text-body">
        <router-link :to="{ name: 'period-create' }" rel="period-create">
          <div class="no-link omb-color-primary">+ New period</div>
        </router-link>
      </div>

    <div class="omb-margin-2 no-link">
      <router-link :to="{ name: 'period', params: { periodId: 'current' }}" rel="current">
        Сейчас идет период ({{ period.current.start_date + " - " + period.current.end_date }})
      </router-link>
    </div>

    <div class="omb-margin-2 no-link" v-if="period.prev">
      <router-link :to="{ name: 'period', params: {periodId: period.prev.id}}" rel="prev">
          Previous ({{ period.prev.start_date + " - " + period.prev.end_date }})
      </router-link>
    </div>

    <div class="omb-margin-2 no-link" v-if="period.next">
      <router-link :to="{ name: 'period', params: {periodId: period.next.id} }" rel="next">
        Next  ({{ period.next.start_date + " - " + period.next.end_date }})
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  name: "Menu",
  created() {
    this.$store.dispatch("fetchPeriod", "current")
  },
  methods: {
    close() {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState(['period']),
    currentRouteName() {
      return this.$route.name;
    }
  }
}
</script>

<style scoped>

</style>
