<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item>
        <router-link to="/">Fight Club</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/">Игра</router-link>
      </b-nav-item>
      <b-nav-item v-if="!loggedIn">
        <router-link to="/login">Вход</router-link>
      </b-nav-item>
      <b-nav-item v-if="loggedIn">
        <router-link to="/table">Статистика</router-link>
      </b-nav-item>
      <b-nav-item v-if="loggedIn">
        <router-link to="/logout">Выйти</router-link>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Navbar',
    computed: mapGetters(['loggedIn'])
  }

</script>