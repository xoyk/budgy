<template>
  <b-modal
    class="fade"
    :id="'planModal' + type"
    role="dialog"
    aria-labelledby="planModalLabel"
    aria-hidden="true"
    data-cy="plan_modal"
    :title="title"
    @show="handleShow"
    @hide="cancel"
    @ok="savePlan"
  >
    <b-form class="modal-body" id="transactionCreateForm">
<!--      <b-tabs pills content-class="mt-3" v-model="tabIndex" v-if="editedItem">-->
<!--        <b-tab-->
<!--            title="Расход"-->
<!--            data-cy="modal_transaction_type_expense"-->
<!--            id="transactionTypeExpense"-->
<!--            name="transactionType"-->
<!--        >-->

<!--        </b-tab>-->
<!--        <b-tab title="Доход">-->

<!--        </b-tab>-->
<!--        <b-tab title="Накопление">-->

<!--        </b-tab>-->
<!--      </b-tabs>-->
        <b-form-group>
          <b-form-input
              class="form-control form-control-lg"
              id="transactionName"
              type="text"
              v-model="form.name"
              placeholder="Название"
              data-cy="modal_transaction_name"
          />
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
      <b-form-group v-if="type === 'income'">
        <div class="row">
          <div class="col-5">
            <b-form-checkbox
                id="checkbox-1"
                v-model="form.received"
                name="checkbox-1"
                value="true"
                unchecked-value="false"
            >
              Доход получен
            </b-form-checkbox>
          </div>
        </div>
      </b-form-group>
      </b-form>
  </b-modal>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { mapState } from "vuex"

export default {
  name: "PlanModal2",
  props: {
    type: String,
    editedItem: Object,
  },
  data() {
    return {
      title: "Новый",
      locale: {
        expense: "расход",
        income: "доход",
        saving: "накопление"
      },
      form: {
        name: "",
        amount: "",
        received: "",
        id: ""
      },
      show: false
    };
  },
  methods: {
    deleteTransaction() {},
    handleShow(){
      console.log(this.editedItem)

      if(this.editedItem){
        this.form.name = this.editedItem.name || ""
        this.form.amount = this.editedItem.amount || ""
        this.form.id = this.editedItem.id || ""

        if(this.type === "income"){
          this.form.received = this.editedItem.received
        }

        this.title = "Редактирование '" + this.locale[this.type] + "'"
        this.form.type = this.type
      } else {

       // create new element
        this.resetModal()
      }
    },
    savePlan(event) {
      event.preventDefault();
      let data =  {};
      data.data = [];

      data.type = this.type;
      data.period = this.period.current.id;

      data.data.push(this.form);

      this.$store
        .dispatch("savePlan", data)
        .then(() => {
          this.resetModal();
          this.$bvModal.hide("planModal" + this.type);
        })
        .catch(() => {});
    },
    resetModal() {
      // Reset our form values
      this.form.name = "";
      this.form.id = "";
      // TODO нужно изобавиться от поля form.type
      //  и передавать сохранение расхода, дохода и накоплеения
      //  по своим отдельным урлам
      this.form.type = "";
      this.form.amount = "";
      this.form.received = "false";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.title = "Новый " + this.locale[this.type]
      this.$nextTick(() => {
        this.show = true;
      });
    },
    cancel() {
    }
  },
  computed: {
    ...mapState(["period"])
  }
};
</script>

<style lang="scss" scoped></style>
