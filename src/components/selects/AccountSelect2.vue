<template>
  <div>
    <OmbItemList
        v-for="item in accounts.regular"
        :key="item.id"
        :item="item"
        v-on:clicked="changeAccount(item)"
    >
    </OmbItemList>
    <hr>
    <OmbItemList
        v-for="item in accounts.saving"
        :key="item.id"
        :item="item"
        v-on:clicked="changeAccount(item)"
    >
    </OmbItemList>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OmbItemList from "../transaction/OmbItemList";

export default {
  name: "AccountSelect2",
  props: {
    accountType: String
  },
  data() {
    return {
      currentAccount: "",
    }
  },
  components: {
    OmbItemList
  },
  watch: {
    "$store.state.period": "fetchData"
  },
  computed: {
    model: {
      get() {
        return this.transaction.account[this.accountType]
      },
      set(value) {
        this.transaction.account[this.accountType] = value
      }
    },
    ...mapState(["accounts", "period"]),
    ...mapState({
      transaction: state => state.transaction.transaction
    })
  },
  created() {
    this.fetchData()
  },
  methods: {
    changeAccount(account) {
      this.$store.dispatch("transaction/setTransactionAccount", {account: account, type: this.accountType})
      this.$router.go(-1)
    },
    scrollToElement(id) {
      var account = document.getElementById(id);
      account.scrollIntoView({
        behavior: 'smooth',
        inline: 'start'
      })
    },
    fetchData() {
      this.$store.dispatch("fetchAccounts")
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/custom";
  .omb-grid-2 {
    display: grid;
    grid-template-rows: 1fr 19px 19px;
    grid-row-gap: 4px;
    height: 100%;
  }

  #account-list-wrapper {
    overflow: hidden;
  }

  .account.active .omb-grid-2 {
   margin-right: -1px;
  }

  .account {
    min-height: 52px;
    border-radius: 16px;
    height: 100px;
    white-space: nowrap;
    border: 1px solid rgba(0, 0, 0, 0.04);
    text-align: left;
    font-size: $omb-text-body;
    padding: 12px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .account a {
    text-decoration: none;
    color: $omb-color-secondary;
  }

  .account.active {
    margin-right: 1px;
    box-shadow: 0 12px 24px rgba(31, 240, 190, 0.3);
    border: 2px solid rgba(31, 240, 190, 0.9);
  }

  .account-desc {
    font-size: $omb-text-caption;
    color: $omb-color-tetriary;
  }

  .account-name {
    color: $omb-color-secondary;
  }

  #account-list-container, #account-list-container2 {
    column-gap: 12px;
    row-gap: 12px;
    margin-bottom: 20px;
  }

  #more-link-container {
    justify-content: center;
    align-content: center;
    display: flex;
    margin: auto;
  }

  .more_link a {
    color: $omb-color-secondary;
    font-size: $omb-text-body;
    text-align: center;
    display: inline;
    text-decoration: none;
  }

  .account-list-container {
    column-gap: 12px;
  }

  .more_link a:hover {
    text-decoration: none;
  }

</style>
