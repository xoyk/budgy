<template>
  <b-modal
    class="fade"
    id="transactionModal"
    role="dialog"
    aria-labelledby="transactionModalLabel"
    aria-hidden="true"
    data-cy="transaction_modal"
    title="Новая транзакция"
    @ok="saveTransaction"
    hide-footer
  >
    <div class="modal-body">
      <b-form id="transactionCreateForm">
        <div class="form-group">
          <b-tabs pills content-class="mt-3" v-model="tabIndex">
            <b-tab
              title="Расход"
              :title-link-attributes="attr.expense"
              id="transactionTypeExpense"
              name="transactionType"
              v-model="form.transactionType"
              value="expense"
              active
            >
              <ExpenseTab :period="period" :form="form"></ExpenseTab>
            </b-tab>
            <b-tab
                title="Доход"
                :title-link-attributes="attr.income"
                id="transactionTypeIncome"
                name="transactionType"
                v-model="form.transactionType"
                value="income"
            >
              <IncomeTab :period="period" :form="form"></IncomeTab>
            </b-tab>
            <b-tab
                title="Накопление"
                :title-link-attributes="attr.saving"
                id="transactionTypeSaving"
                name="transactionType"
                v-model="form.transactionType"
                value="saving"
            >
              <SavingTab :period="period" :form="form"></SavingTab>
            </b-tab>
            <b-tab title="Трансфер">
              <TransferTab :period="period" :form="form"></TransferTab>
            </b-tab>
          </b-tabs>
        </div>
        <div class="form-group">
          <b-button data-cy="save_transaction_button" variant="primary" @click="saveTransaction">ОК</b-button>
          <b-button variant="outline-warning" @click="cancel">Отмена</b-button>
        </div>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import ExpenseTab from "@/components/modals/ExpenseTab";
import IncomeTab from "@/components/modals/IncomeTab";
import SavingTab from "@/components/modals/SavingTab";
import TransferTab from "@/components/modals/TransferTab";
import "vue-select/dist/vue-select.css";

export default {
  name: "TransactionModal",
  props: ["period"],
  data() {
    return {
      form: {
        date: "",
        name: "",
        transactionType: "",
        amount: "",
        expense: "",
        saving: "",
        income: "",
        category: "",
        account: {
          source: "",
          receiver: ""
        }
      },
      tabs: ["expense", "income", "saving", "transfer"],
      tabIndex: 0,
      show: true,
      attr: {
        income: {"data-cy": "modal_transaction_type_income"},
        expense: {"data-cy": "modal_transaction_type_expense"},
        saving: {"data-cy": "modal_transaction_type_saving"},
        transfer: {"data-cy": "modal_transaction_type_transfer"}
      }
    };
  },
  components: {
    ExpenseTab,
    IncomeTab,
    SavingTab,
    TransferTab
  },
  created() {
    this.$store.dispatch("fetchAccounts");
  },
  methods: {
    deleteTransaction() {},
    saveTransaction(event) {
      event.preventDefault();

      this.form.transactionType = this.tabs[this.tabIndex];
      this.form.expense = this.form.expense.id || "";
      this.form.expense = this.form.saving.id || this.form.expense;
      this.form.income = this.form.income.id || "";
      this.form.account.source = this.form.account.source.id || "";
      this.form.account.receiver = this.form.account.receiver.id || "";
      this.form.category = this.form.category.id || "";

      this.$store
        .dispatch("saveTransaction", this.form)
        .then(() => {
          this.resetModal();
          this.$bvModal.hide("transactionModal");
        })
        .catch(() => {});
    },
    resetModal() {
      // Reset our form values
      this.form.date = "";
      this.form.name = "";
      this.form.transactionType = "";
      this.form.amount = "";
      this.form.expense = "";
      this.form.saving = "";
      this.form.income = "";
      this.form.category = "";
      this.form.account = {
        source: "",
        receiver: ""
      };
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    cancel() {
      //this.resetModal();
      this.$bvModal.hide("transactionModal");
    }
  }
};
</script>

<style lang="scss" scoped></style>
