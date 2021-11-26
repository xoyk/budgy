<template>
  <v-select
    label="name"
    size="lg"
    :options="savings"
    v-model="form.saving"
    :key="savings.id"
  />
</template>

<script>
import VSelect from "vue-select";
import { mapState } from "vuex";

export default {
  name: "SavingSelect",
  components: {
    VSelect
  },
  props: {
    form: Object
  },
  computed: {
    ...mapState(["savings"])
  }
};
</script>

<style scoped></style>
