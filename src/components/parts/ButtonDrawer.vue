<template>
  <div class="omb-margin-1">
    <b-container class="button" id="button-container">
      <b-row class="button-background" align-h="end" no-gutters>
        <b-col lg="2" md="4">
          <button
              class="budgy-button"
              id="transactionCreate"
              data-cy="create_transaction_button"
              @click="presentDrawer"
          >
            {{ text }}
          </button>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ButtonDrawer",
  computed: {
    ...mapState(["drawer"])
  },
  data() {
    return {
      show: true
    }
  },
  props: {
    text: String
  },
  methods: {
    presentDrawer() {
      this.$store.dispatch("setButtonState", {type: "add", status: false})
    },
  },
}
</script>

<style scoped>

.container.button {
  padding-left: 0;
  padding-right: 0;
}

.button-background {
  background: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8555) 25%, rgba(255, 255, 255, 0.6705) 50%,  rgba(255, 255, 255, 0) 100%);
  height: 104px;
  padding: 32px 0px;
}
</style>
