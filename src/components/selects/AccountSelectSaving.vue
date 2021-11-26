<template>
  <div>
    <div id="item-list-container" v-if="accounts.saving" class="text-left">
      <div
          class="item-list"
          :class="{ active : transaction.account.source === savingAccount.id }"
          v-for="savingAccount in savingsActive"
          :key="savingAccount.id"
          @click="selectSavingAccount(savingAccount)"
      >
        <div class="d-flex flex-column">
          <span class="expense-name omb-text-footnote">{{ savingAccount.name }}</span>
          <span class="expense-balance omb-text-body">{{ currency(savingAccount.balance / 100) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";

Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce( (res, key) => (res[key] = obj[key], res), {})

export default {
  name: "AccountSelectSaving",
  props: {
    accountType: String
  },
  created(){
    this.transaction.account.source = ""
  },
  watch: {
    "$store.state.period": "fetchData"
  },
  computed: {
    savingsActive: function () {
      return Object.filter(this.accounts.saving, saving => saving.balance > 0)
    },
    ...mapState(["accounts", "savings"]),
    ...mapState("transaction", ["transaction"])
  },
  methods: {
    selectSavingAccount(savingAccount) {
      this.transaction.account.source = savingAccount.id
      this.transaction.expense = ""
    },
    currency(amount) {
      if(this.accounts.items)
        return amount.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0})
    },
    fetchData() {
      if(this.period)
        this.$store.dispatch("fetchAccounts", this.period.now)
    }
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/custom";
  // блоки-обертки
  #item-list-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    column-gap: 12px;
    row-gap: 12px;
    word-break: break-word;
  }
  // блоки-обертки END

  .item-list {
    border-radius: 16px;
    padding: 12px 16px;
    margin-right: 12px;
    margin-bottom: 12px;
    font-size: $omb-text-footnote;
    background-color: $omb-bg-color-accent;
    border: 2px solid $omb-bg-color-accent;
    display: inline-block;
  }

  .item-list a {
    color: $omb-text-secondary;
    white-space: nowrap;
    margin: auto;
  }

  .item-list a:visited, .item-list2 a:hover {
    text-decoration: none;
  }

  .item-list.active {
    background-color: white;
    border: 2px solid rgba(31, 240, 190, 0.9);
  }

  .expense-name {
    white-space: nowrap;
    color: $omb-text-secondary;
  }

  .expense-balance {
    color: $omb-text-primary;
    white-space: nowrap;
  }

</style>
