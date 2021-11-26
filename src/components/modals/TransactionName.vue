<template>
  <b-form-input
      class="form-control form-control-lg"
      id="transactionName"
      type="text"
      v-model="form.name"
      placeholder="Название"
      :data-cy="'modal_transaction_name_' + type"
  />
</template>

<script>
export default {
  name: "TransactionName",
  props: {
    form: Object,
    type: String
  }
}
</script>

<style scoped>

</style>
