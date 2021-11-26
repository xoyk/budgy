<template>
  <div data-cy="modal_transaction_category">
    <v-select
        label="name"
        :options="categories"
        v-model="form.category"
        :key="categories.id"
    />
  </div>

</template>

<script>
import vSelect from "vue-select";
import { mapState } from "vuex";

export default {
  name: "CategorySelect",
  components: {
    vSelect
  },
  created() {
    this.$store.dispatch('fetchCategories')
  },
  updated() {
    //$(this.$refs.select).selectpicker('refresh')
  },
  props: {
    form: Object
  },
  computed: {
    ...mapState(["categories"])
  },
  data() {
    return {
      select: "1"
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
