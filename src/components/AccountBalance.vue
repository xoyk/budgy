<template>
    <div data-cy="account_amount" class="align-right">
      <div class="omb_total">
        {{ formatCurrency(account.balance,account.currency.code) }}
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
        "EUR": 0.010526, // Conversion rate for EUR (1/95)
        "AMD": 4,        // Conversion rate for AMD
        "RUB": 1         // Base currency, no conversion needed
      }
    }
  },
  methods: {
    formatCurrency(amount, currencyCode) {
      const rate = this.rates[currencyCode] || 1; // Fallback to 1 if rate not found
      const convertedAmount = amount * rate / 100;
      return new Intl.NumberFormat('ru-RU', {maximumFractionDigits: 2}).format(convertedAmount);
    },
  }
}
</script>

<style scoped>
  .omb_total {
    font-family: Abel, sans-serif;
    font-weight: bold;
  }
</style>
