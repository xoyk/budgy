<template>
  <div data-cy="modal_transaction_container_income">
    <b-form-group id="incomesContainer">
      <div class="row">
        <div class="col-12">
          <b-form-group id="incomesFormGroup">
            <label for="transactionIncome" id="incomeLabel"
            >Статья дохода</label
            >
            <IncomeSelect :form="form"></IncomeSelect>
          </b-form-group>
        </div>
      </div>
    </b-form-group>
    <b-form-group id="accountReceiverContainer">
      <div class="row">
        <div class="col-12">
          <b-form-group id="accountReceiverGroup">
            <label for="transactionAccount" id="accountLabel">Счёт</label>
            <AccountSelect2 :form="form" account-type="receiver"></AccountSelect2>
          </b-form-group>
        </div>
      </div>
    </b-form-group>
  </div>
</template>

<script>

import IncomeSelect from "@/components/selects/IncomeSelect";
import AccountSelect2 from "@/components/selects/AccountSelect2";

export default {
  name: "IncomeTab",
  props: {
    period: String,
    form: Object
  },
  components: {
    IncomeSelect,
    AccountSelect2
  }
};
</script>

<style scoped></style>
