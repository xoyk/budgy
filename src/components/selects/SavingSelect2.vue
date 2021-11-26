<template>
  <div>
    <div class="d-flex justify-content-between flex-column" v-if="savings.items">
      <div
          class="item-list d-flex justify-content-between"
          :class="{ active : transaction.saving === saving.id }"
          v-for="saving in savings.items.active"
          :key="saving.id"
          @click="changeSaving(saving)"
      >
        <div>{{ saving.name }}</div>
        <div>{{ saving.balance  }}</div>
      </div>

    </div>
  </div>

</template>

<script>

import { mapState } from "vuex";

export default {
  name: "SavingSelect2",
  props: {
    form: Object,
  },
  data() {
    return {
      currentSaving: null,
    }
  },
  computed: {
    ...mapState(["savings"]),
    ...mapState("transaction", ['transaction'])
  },
  methods: {
    changeSaving(saving) {
      this.currentSaving = saving.id
      this.transaction.saving = saving.id
      this.transaction.amount = saving.amount
    },
  },
};
</script>

<style scoped>
  .item-list.active {
    background-color: #eadd2b;
  }
</style>
