<template>
  <div class="foo">
    <div class="omb-margin-1 d-flex flex-column justify-content-between flex-grow-1 omb-layout-height100" id="login-form">
      <form class="login flex-grow-1" @submit.prevent="login">
        <CloseButton></CloseButton>
        <h1 class="omb-text-headline">Вход</h1>
        <div class="omb-margin-bottom d-flex flex-column" style="background-color: #0cb68e" id="email-field">
          <label class="align-self-start omb-text-caption omb-color-tetriary" for="email-field" v-if="email">Email</label>
          <OmbInput class="omb-field" type="text" style="background-color: #2db487" placeholder="Email" v-model="email"></OmbInput>
        </div>

        <div class="d-flex justify-content-between">
<!--          <OmbInputPassword v-model="password"></OmbInputPassword>-->
          <OmbInput :type="type" placeholder="Пароль" v-model="password" :icon="icon" v-on:clicked="togglePassword()"></OmbInput>
        </div>

<!--        <div class="text-right omb-height d-flex flex-row align-items-center">-->
<!--          <div class="flex-grow-1 omb-text-body omb-color-secondary">Напомнить пароль?</div>-->
<!--        </div>-->

      </form>

      <div class="text-right omb-height d-flex flex-row justify-content-center omb-gap p16024">
        <div class="omb-text-body omb-color-secondary">Нет аккаунта?</div>
        <div class="omb-text-body ">Скоро будут инвайты</div>
      </div>

      <button
          type="submit"
          class="budgy-button"
          id="login"
          @click="login"
      >
        Войти
      </button>
    </div>
  </div>
</template>

<script>
import OmbInput from "@/components/parts/OmbInput";
import CloseButton from "@/components/parts/CloseButton";

export default {
  name: "Login",
  components: {
    CloseButton,
    OmbInput
  },
  data() {
    return {
      email : "",
      password : "",
      showPassword: false,
      type: "password",
      icon: "eyeClosed"
    }
  },
  created(){
    this.$store.dispatch("logout")
  },
  methods: {
    login: function () {
      let username = this.email
      let password = this.password
      this.$store.dispatch('login', { username, password })
          .then(
              () => window.location.replace('/')
          )
          .catch(err => console.log(err))
    },
    togglePassword(){
      this.showPassword = !this.showPassword
      if(this.showPassword) {
        this.icon = "eyeOpen"
        this.type = "text"
      } else {
        this.icon = "eyeClosed"
        this.type = "password"
      }
    }
  }
}
</script>

<style scoped lang="scss">
  h1 {
    text-align: left;
    padding: 8px 0 24px 0;
    margin-bottom: 0;
  }

  .p16024 {
  padding: 16px 0 24px 0;
  }

  .omb-field, input {
    height: 38px !important;
    background-color: transparent !important;
  }
</style>
