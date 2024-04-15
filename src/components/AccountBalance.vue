<template>
    <div data-cy="account_amount" class="align-right">
      <div class="small">RUB {{ account.balance / 100 }}</div>
      <div>
        <b-badge variant="warning" pill>{{ formatCurrency(account.balance,account.currency.code) }}</b-badge>
      </div>
    </div>
</template>
<script>
export default {
  name: 'AccountBalance',
  props: {
    account: {},

  },
  data() {
    return {
      rates: {
        "USD": 0.010526, // Conversion rate for USD (1/95)
        "AMD": 4,        // Conversion rate for AMD
        "RUB": 1         // Base currency, no conversion needed
      }
    }
  },
  methods: {
    formatCurrency(amount, currencyCode) {
      const rate = this.rates[currencyCode] || 1; // Fallback to 1 if rate not found
      const convertedAmount = amount * rate;
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(convertedAmount / 100);  // Assuming displaying in USD for simplicity
    },
  }
}
</script>

<style scoped>

</style>
