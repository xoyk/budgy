<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Name"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email : "",
      password : ""
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
    }
  }
}
</script>

<style scoped>

</style>
