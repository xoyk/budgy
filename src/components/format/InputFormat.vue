<template>
  <div>
    <input class="omb-form-input w-100" v-model="displayValue" @blur="handleInputState" @focus="handleInputState" :placeholder="placeholder">
  </div>
</template>

<script>
const masks = {
  currency: {
    mask(value){
      return this.formatAmount(value)
    },
    unmask(value){
      value = parseFloat(value.replace(/[^\d.]/g, ''))

      return isNaN(value)
          ? 0
          : value
    },
    formatAmount(amount) {
      return amount.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0})
    }
  }
}

export default {
  name: "InputFormat",
  props: {
    value: null,
    maskType: String,
    placeholder: String
  },
  data() {
    return {
      inputFocused: false
    }
  },
  methods: {
    handleInputState(event){
      this.inputFocused = event.type === 'focus'
    },
    unmask(value){
      return masks[this.maskType].unmask(value)
    },
    mask(value){
      return masks[this.maskType].mask(value)
    }
  },
  computed: {
    displayValue: {
      get: function (){
        if(this.inputFocused){
          return this.value.toString()
        } else {
          return this.mask(this.value)
        }
      },
      set: function (modifiedValue){
        this.$emit('input', this.unmask(modifiedValue))
      }
    }
  }
}
</script>

<style scoped>

</style>
