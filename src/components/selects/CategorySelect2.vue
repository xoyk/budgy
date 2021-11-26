<template>
  <div class="drawer-section-container">
    <div data-cy="modal_transaction_category" class="d-flex justify-content-start category_list">
      <div
          class="category"
          :class="{ active: currentCategory == category.id }"
          v-for="category in categories"
          :key="category.id"
          @click="setCategory(category.id)"
      >
        {{ category.name }}
      </div>
    </div>
  </div>


</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CategorySelect2",
  components: {

  },
  created() {
    this.$store.dispatch('fetchCategories')
  },
  computed: {
    ...mapState(["categories"]),
    ...mapState("transaction", ["transaction"])
  },
  methods: {
    setCategory(categoryId) {
      this.currentCategory = categoryId
      this.transaction.category = categoryId
    }
  },
  data() {
    return {
      select: "1",
      currentCategory: ""
    };
  }
};
</script>

<style lang="scss" scoped>
  .category {
    background-color: rgba(255, 190, 190, 0.5);
    padding: 6px 12px;
    margin-right: 6px;
    margin-bottom: 6px;
    border-radius: 16px;
    white-space: nowrap;
  }

  .category:hover {
    cursor: pointer;
  }

  .category.active {
    background-color: rgba(255, 190, 190, 1);
  }

  .category_list {
    overflow-x: scroll;
    padding-left: 16px;
  }

  .category_list::-webkit-scrollbar {
    display: none;
  }

  .drawer-section-container {
    overflow: hidden;
  }
</style>
