<template>
  <div class="posts">
    <Navbar />
    <div v-for="posts in APIData" :key="posts.id">
      <b-container>
        <b-card title = '{{ posts.title }}'>
          <b-card-text>
            {{ posts.content }}
          </b-card-text>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar"
  import { getAPI } from '@/axios.api'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { mapState } from 'vuex'

  export default {
    name: 'Posts',

    components:{
      Navbar
    },
    computed: mapState(['APIData']),

    created() {
      getAPI.get('/posts/', {headers:{ Authorization: `Bearer ${this.$store.state.accessToken}`}})
        .then(response => {
          this.$store.state.APIData = response.data
        })
      .catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>

</style>