<template>
  <div>
    <b-navbar toggleable="true" class="navbar navbar-dark bg-dark">
      <b-navbar-brand>Счета</b-navbar-brand>
      <b-navbar-toggle target="accountList" fixed></b-navbar-toggle>
    </b-navbar>
    <div>
      <b-collapse cols="12" id="accountList">
        <b-list-group id="accountTable" data-cy="account_list">
          <div class="mt-3">Регулярные</div>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="account in accounts.regular" :key="account.id" :account="account">
            {{ account.name }}
            <b-badge variant="success" pill data-cy="account_amount">{{ account.balance / 100 }}</b-badge>
          </b-list-group-item>
          <div class="mt-3">Накопления</div>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="account in accounts.saving" :key="account.id" :account="account">
            {{ account.name }}
            <b-badge variant="success" pill data-cy="account_amount">{{ account.balance / 100 }}</b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AccountList",
  created() {
    this.$store.dispatch("fetchAccounts");
  },
  computed: {
    ...mapState(["accounts"])
  }
};
</script>

<style scoped></style>
