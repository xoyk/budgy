<template>
  <div>
    <b-form-group>
      <Datepicker :form="form"></Datepicker>
    </b-form-group>
    <b-form-group>
      <TransactionName :form="form" type="saving"></TransactionName>
    </b-form-group>
    <b-form-group>
      <div class="row">
        <div class="col-5">
          <b-form-input
              autocomplete="off"
              class="form-control form-control-lg"
              id="transactionAmount"
              type="number"
              v-model="form.amount"
              placeholder="Сумма"
              data-cy="modal_transaction_amount"
          />
        </div>
      </div>
    </b-form-group>
    <b-form-group id="savingContainer">
      <div class="row">
        <div class="col-12">
          <b-form-group id="savingFormGroup">
            <label for="transactionSaving" id="savingLabel"
            >Статья накопления</label
            >
            <SavingSelect :form="form"></SavingSelect>
          </b-form-group>
        </div>
      </div>
    </b-form-group>
    <b-form-group id="accountSourceContainer">
      <div class="row">
        <div class="col-12">
          <b-form-group id="accountSourceGroup">
            <label for="transactionAccount" id="accountLabel">Счёт списания</label>
            <AccountSelect :form="form" account-type="source"></AccountSelect>
          </b-form-group>
        </div>
      </div>
    </b-form-group>
    <b-form-group id="accountReceiverContainer">
      <div class="row">
        <div class="col-12">
          <b-form-group id="accountReceiverGroup">
            <label for="transactionAccount" id="accountLabel">Счёт пополнения</label>
            <AccountSelect :form="form" account-type="receiver"></AccountSelect>
          </b-form-group>
        </div>
      </div>
    </b-form-group>
  </div>
</template>

<script>

import Datepicker from "@/components/modals/Datepicker";
import AccountSelect from "@/components/selects/AccountSelect";
import SavingSelect from "@/components/selects/SavingSelect";
import TransactionName from "./TransactionName";

export default {
  name: "SavingTab",
  props: {
    period: String,
    form: Object
  },
  components: {
    Datepicker,
    AccountSelect,
    TransactionName,
    SavingSelect
  }
};
</script>

<style scoped></style>
