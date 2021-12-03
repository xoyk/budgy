<template>
  <div id="app">
    <div id="app-container">
      <b-container fluid="lg" class="p-0">
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </b-container>
    </div>
  </div>
</template>

<script>
// import Debug from "./components/dev/Debug";
import { mapState } from "vuex"

export default {
  components: {
    // Debug
  },
  data() {
    return {
        "drawerSettings": {
          header: "Новая транзакция",
          show: false
        }
    }
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    ...mapState(["buttons"])
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      //return new Promise(function (resolve, reject) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  }
};
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  @import "~bootstrap/scss/_functions.scss";
  @import "./assets/custom.scss";

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
  }

  .hidden {
    display: none;
  }

  .no-link, .no-link:hover, .no-link:visited {
    text-decoration: none;
  }

  .no-link a {
    color: $omb-color-primary;
  }

  .more_link a {
    color: rgba(0, 198, 150, 1)
  }

  .budgy-button {
    border: none;
    background: transparent;
  }

  button {
    font-size: 13px;
    border-style: none;
    border-radius: 16px;
    padding: 0;
  }

  .budgy-button:hover, button:focus, .drawer-buttons > button:focus {
    outline: none !important;
  }

  .color-freemoney {
    background-color: $omb-bg-color-accent;
  }

  .drawer-buttons > a:hover {
    text-decoration: none;
  }

  .grid {
    display: grid;
  }

  label {
    margin-bottom: 0 !important;
  }

  .omb-button-primary {
    background: linear-gradient($omb-button-primary-degree, $omb-button-primary-first, $omb-button-primary-second);
  }

  .omb-button-primary.disabled {
    opacity: 0.3;
  }

  .omb-color-primary {
    color: rgba(0, 0, 0, 0.9);
  }

  .omb-color-primary2 {
    color: rgba(0, 0, 0, 1);
  }

  .omb-color-secondary {
    color: rgba(0, 0, 0, 0.5);
  }

  .omb-color-tetriary {
    color: rgba(0, 0, 0, 0.3);
  }

  .omb-color-success {
    color: #34c700;
  }

  .omb-form-input {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding: 0;
    //border-bottom: solid 1px $omb-color-tetriary !important;
    border: 0;
    display: grid;
    grid-template-columns: 1fr;
  }

  .omb-form-input-2 {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding: 20.5px 0 20.5px 0;
    display: grid;
    grid-template-columns: 1fr;
  }

  .omb-gap {
    gap: $omb-gap;
  }

  .omb-height {
    height: $omb-height;
  }

  .omb-layout-height100 {
    height: 100vh;
  }

  // текстовые стили
  .omb-text-caption {
    font-size: 12px;
    line-height: 135%;
  }

  .omb-text-title {
    font-size: $omb-text-title;
    line-height: 135%;
    font-weight: bold;
    text-transform: uppercase;
    text-align: left;
  }

  .omb-text-body {
    font-size: 16px;
    line-height: normal;
  }

  .omb-text-headline {
    font-size: $omb-text-headline;
    line-height: 135%;
  }

  .omb-text-headline-super {
    font-size: 50px;
    line-height: 100%;
    font-weight: bold;
  }

  .omb-text-footnote {
    font-size: 14px;
    line-height: 135%;
  }

  .omb-scrollable {
    overflow-y: scroll;
  }

  .omb-scrollable::-webkit-scrollbar {
    display: none;
  }

  .omb-uppercase {
    text-transform: uppercase;
  }

  .omb-wrapper {
    overflow: hidden;
  }

  .omb-border-bottom {
    border-bottom: solid 1px $omb-color-tetriary !important;
  }

  .omb-height {
    height: $omb-height;
  }

  .omb-margin-left {
    margin-left: 24px;
  }

  .omb-margin-bottom {
    margin-bottom: $omb-margin-bottom;
  }

  .omb-margin-1 {
    margin-left: $omb-margin;
    margin-right: $omb-margin;
  }

  .omb-margin-2 {
    margin-left: $omb-margin-sm;
    margin-right: $omb-margin;
  }

  .omb-margin-3 {
    margin-bottom: 28px;
  }

  .omb-padding-1 {
    padding: 12px 0;
  }

  .omb-padding-2 {
    padding: 16.5px 0;
  }

  .omb-padding-3 {
    padding-right: $omb-padding;
  }

  .omb-padding-icon {
    padding: $omb-padding-icon;
  }

  .tab-content {
    width: 100%;
    padding: 0 $omb-margin-left;
  }

  .tab-content input {
    box-sizing: border-box;
    border: 0;
    padding: 0;
    height: 64px;
  }

  .drawer-buttons button {
    height: 48px;
    border-radius: $omb-border-radius !important;
    width: 100%;
  }

  .item-list {
    border-radius: 16px;
    padding: 12px 0;
    font-size: $omb-text-body;
    display: inline-block;
    line-height: 19px;
  }

  footer {
    position: sticky;
    bottom: 0;
    height: 104px;
  }

  .budgy-card {
    text-align: left;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.03);
    box-sizing: border-box;
    box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 16px;
    padding-top: 15px;
    padding-bottom: 24px;
    margin-bottom: 10px;
  }

  .budgy-button {
    margin-bottom: 10px;
    font-size: 16px;
    border: 0;
    width: 100%;
    border-radius: 24px;
    color: black;
    height: 48px;
    background: linear-gradient(91.47deg, #00FF38 4.17%, #00FFC2 93.62%);
  }

  .budgy-icon {
    width: 36px;
    height: 36px;
    border-radius: 45px;
    min-width: 36px;
  }

  .icon-expense {
    background-color: #FFDAD9;
  }

  :focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
    outline-color: -webkit-focus-ring-color;
    outline-style: none;
    outline-width: 0;
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
</style>

<style lang="scss" scoped>

#app {
  font-family: "SF Pro Display", "Roboto", sans-serif;
}

header {
  padding: 0 !important;
}

.bottom-menu {
  background-color: white;
  height: 56px;
}

.bottom-menu > div {
  width: 75px;
}

.bottom-menu .menu-item-title {
  font-size: 10px;
  color: #B3B3B3;
}

.menu-item a {
  text-decoration: none;
}

/** TRANSITIONS **/
.fade-enter {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(50px);
  opacity: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

</style>
