<template>
  <b-form inline>
    <label class="mr-sm-2" for="transactionDate">Дата</label>
    <b-form-datepicker
      id="transactionDate"
      v-model="form.date"
      class="mb-2"
      size="lg"
      data-cy="modal_transaction_date"
    ></b-form-datepicker>
  </b-form>
</template>

<script>
export default {
  name: "Datepicker",
  props: {
    form: Object
  }

};
</script>

<style scoped></style>
