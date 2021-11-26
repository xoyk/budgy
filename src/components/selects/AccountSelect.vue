<template>
  <div :data-cy="'modal_transaction_account_' + accountType">
    <v-select
        label="name"
        class="form-lg"
        :options="accounts"
        v-model="model"
        :key="accounts.code"
    />
  </div>
</template>

<script>
import VSelect from "vue-select";
import { mapState } from "vuex";

export default {
  name: "AccountSelect",
  components: {
    VSelect
  },
  props: {
    period: String,
    form: Object,
    accountType: String
  },
  computed: {
    model: {
      get() {
        return this.accountType === "source" ? this.form.account.source : this.form.account.receiver
      },
      set(value) {
        if (this.accountType === "source") {
          this.form.account.source = value
        } else {
          this.form.account.receiver = value
        }
      }
    },
    ...mapState(["accounts"])
  }
};
</script>

<style scoped></style>
