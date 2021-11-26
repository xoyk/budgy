<template>
  <div>
    <b-form-group>
      <Datepicker :form="form"></Datepicker>
    </b-form-group>
    <b-form-group>
      <TransactionName :form="form" type="expense"></TransactionName>
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
    <b-form-group id="categoryContainer">
      <b-row>
        <b-col>
          <b-form-group id="categoryFormGroup">
            <label for="transactionCategory" id="categoryLabel"
              >Категория</label
            >
            <CategorySelect :form="form"></CategorySelect>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>
    <b-form-group id="expensesContainer">
      <b-row>
        <b-col>
          <b-form-group id="expensesFormGroup">
            <label for="transactionExpense" id="expenseLabel"
              >Статья расхода</label
            >
            <ExpenseSelect :form="form"></ExpenseSelect>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>
    <b-form-group id="accountSourceContainer">
      <div class="row">
        <div class="col-12">
          <b-form-group id="accountSourceGroup">
            <label for="transactionAccount" id="accountLabel">Счёт</label>
            <AccountSelect :form="form" account-type="source"></AccountSelect>
          </b-form-group>
        </div>
      </div>
    </b-form-group>
  </div>
</template>

<script>
import CategorySelect from "@/components/selects/CategorySelect";
import ExpenseSelect from "@/components/selects/ExpenseSelect";
import AccountSelect from "@/components/selects/AccountSelect";
import Datepicker from "@/components/modals/Datepicker";
import TransactionName from "./TransactionName";
import {mapState} from "vuex";

export default {
  name: "ExpenseTab",
  props: {
    period: String,
    form: Object
  },
  components: {
    CategorySelect,
    ExpenseSelect,
    AccountSelect,
    TransactionName,
    Datepicker
  },
  watch: {
    '$store.state.period': 'fetchData'
  },
  computed: {
  ...mapState(["expenses", "period"])
  },
};
</script>

<style scoped></style>
