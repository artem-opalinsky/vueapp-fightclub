<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item>
        <router-link to="/">Fight Club</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/">Game</router-link>
      </b-nav-item>
      <b-nav-item v-if="auth">
        <router-link to="/logout">Logout</router-link>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { mapState } from 'vuex'

  export default {
    name: 'Navbar',
    computed: mapState(['auth'])
  }

</script>