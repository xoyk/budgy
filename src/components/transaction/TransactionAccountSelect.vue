<template>
  <div>
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
    default: {
      name: "",
      balance: "",
      id: ""
    }
  },
  name: "TransactionAccountSelect",
  components: {
    OmbSelect,
    SectionHeader
  },
  created() {
    this.$store.dispatch('fetchAccounts')
    if(!this.transaction.account[this.type]){
      this.transaction.account[this.type] = this.default.id
    }
  },
  methods: {
    showAccounts() {
      this.$router.push({name: "transaction-edit-account", params: {type: this.type} })
    }
  },
  computed: {
    name() {
      if(this.accounts.items){
        return this.transaction.account[this.type] ? this.accounts.items[this.transaction.account[this.type]]['name'] : this.default.name
      } else {
        return this.default.name
      }
    },
    amount(){
      let accountId = this.transaction.account[this.type]
      if(accountId){
        return this.accounts.items[accountId]['amount']
      } else
      {
        if(this.accounts.default){
          return this.default.amount
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
