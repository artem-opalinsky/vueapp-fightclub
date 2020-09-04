<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item>
        <router-link to="/">Fight Club</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/">Posts</router-link>
      </b-nav-item>
      <b-nav-item v-if="accessToken!=null">
        <router-link to="/logout">Logout</router-link>
      </b-nav-item>
      <b-nav-item v-else>
        <router-link to="/login">Login</router-link>
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
    computed: mapState(['accessToken'])
  }

</script>