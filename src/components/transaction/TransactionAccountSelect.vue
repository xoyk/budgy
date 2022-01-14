<template>
  <div v-if="accounts">
    <SectionHeader :text="text"></SectionHeader>
    <OmbSelect :title="name" :amount="amount" v-on:clicked="showAccounts"></OmbSelect>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OmbSelect from "./OmbSelect";
import SectionHeader from "../parts/SectionHeader";

export default {
  props: {
    text: String,
    type: String,
  },
  name: "TransactionAccountSelect",
  components: {
    OmbSelect,
    SectionHeader
  },
  created() {
    this.$store.dispatch('fetchAccounts')
    if(this.accounts.default){
      if(!this.transaction.account[this.type]){
        this.transaction.account[this.type] = this.accounts.default
      }
    }
  },
  methods: {
    showAccounts() {
      this.$router.push({name: "transaction-edit-account", params: {type: this.type} })
    },
  },
  computed: {
    name() {
      if(this.accounts.items){
        return this.transaction.account[this.type] ? this.transaction.account[this.type]['name'] : this.accounts.default.name
      } else {
        return ""
      }
    },
    amount(){
      let accountId = this.transaction.account[this.type].id
      if(accountId){
        if(this.accounts.items){
          return this.accounts.items[accountId]['balance']
        } else {
          return 0
        }
      } else {
        if(this.accounts.default){
          return this.accounts.default.amount
        } else {
          return 0
        }
      }
    },
    headerTitle(){
      return this.header
    },
    ...mapState({
      transaction: state => state.transaction.transaction,
      accounts: state => state.accounts
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
