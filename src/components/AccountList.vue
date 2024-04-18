<template>
  <div>
    <h2>Accounts</h2>
    <div>
      <div id="accountList">
        <b-list-group id="accountTable" data-cy="account_list">

          <div class="mt-3">Regular</div>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="account in accounts.regular" :key="account.id" :account="account">
            <div>
              {{ account.name }}
            </div>
            <div class="d-flex justify-content-end align-items-center omb-total-block">
              <AccountBalance :account="account"/>
              <b-badge v-if="account.currency" variant="warning" pill data-cy="account_amount" :style="{backgroundColor: account.currency.color}">{{ account.currency.code }}</b-badge>
            </div>
          </b-list-group-item>

          <div class="mt-3">Saving Accounts</div>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="account in accounts.saving" :key="account.id" :account="account">
            <div>
              {{ account.name }}
            </div>
            <div class="d-flex justify-content-end align-items-center omb-total-block">
              <AccountBalance :account="account"/>
              <b-badge v-if="account.currency" variant="warning" pill data-cy="account_amount" :style="{backgroundColor: account.currency.color}">{{ account.currency.code }}</b-badge>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import AccountBalance from "./AccountBalance";

export default {
  name: "AccountList",
  components: {AccountBalance},
  created() {
    this.$store.dispatch("fetchAccounts");
  },
  computed: {
    ...mapState(["accounts"])
  }
};
</script>

<style>
  .omb-total-block {
    column-gap: 10px;
  }
</style>

