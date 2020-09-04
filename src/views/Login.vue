<template>
  <div class="logmodal">
    <p v-if="incorrectAuth">Incorrect login or password entered - please try again</p>
    <b-form @submit.prevent="onLogin">
      <b-input
          v-model="login"
          id="login"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Login"
      ></b-input>
      <b-input
          v-model="password"
          type="password"
          id="password"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Password"
      ></b-input>
      <b-button type="submit"  variant="primary">Log In</b-button>
    </b-form>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  data(){
    return {
      login: '',
      password: '',
      incorrectAuth: false
    }
  },
  methods:{
    onLogin(){
      console.log(this.password, this.login)
      this.$store.dispatch('userLogin',{
        login: this.login,
        password: this.password
      })
      .then(() => {
        this.$router.push({ name: 'posts' })
      })
      .catch(err => {
        console.log(err)
        this.incorrectAuth = true
      })

    }
  }
}
</script>

<style scoped>
form{
  padding: 1rem;
  border: 1px solid #000;
  border-radius: 10px;
  width: 560px;
}
input{
  margin: .5rem auto;
}
button{
  margin: .5rem auto;
}
.logmodal{
  display: flex;
  justify-content: center;
}
</style>