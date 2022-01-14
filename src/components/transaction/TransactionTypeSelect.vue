<template>
    <div id="menu-container">
      <div id="menu-inner">
        <div class="d-flex" id="transaction-menu">
          <span v-for="(tab, index) in tabs" :key="index" :class="isActive(tab.code)" class="omb-text-body menu-item" @click="clicked(index)">
              {{ tab.text }}
          </span></div>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TransactionTypeSelect",
  methods: {
    isActive(tabCode) {
      if(tabCode === this.transaction.type)
        return "active omb-color-primary"
    },
    clicked(index){
      this.$emit('change', index)
      this.$store.dispatch("setCurrentTab", this.tabs[index]['code'])
    }
  },
  computed: {
    ...mapState({
      transaction: state => state.transaction.transaction,
      tabs: state => state.transaction.tabs
    })
  }

}
</script>

<style lang="scss" scoped>
@import "/src/assets/custom.scss";
// transaction type tabs //START
#menu-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  clear: both;
  text-align: left;
  margin-bottom: 16px;
  vertical-align: middle;
}

#menu-inner {
  visibility: visible;
  overflow-x: scroll;
  margin-right: 0;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 12px;
}

#menu-inner > span {
  display: inline-block;
  vertical-align: middle;
}

#menu-inner::-webkit-scrollbar {
  display: none;
}

.menu-item:hover {
  cursor: pointer;
}

.menu-item {
  line-height: 135%;
  color: $omb-color-primary;
  text-decoration: none;
  padding: 12px 16px;
  background: #F5F5F5;
  border-radius: 16px;
  height: 36px;
  align-items: center;
  display: flex;
}

.menu-item.active {
  background: #FFFFFF;
  border: 1px solid #13FFC6;
  box-sizing: border-box;
}

#transaction-menu {
  column-gap: 12px;
}
// transaction type tabs //END

</style>
