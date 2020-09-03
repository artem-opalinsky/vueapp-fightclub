<template>
  <div class="posts">
    <Navbar />
    <div v-for="posts in APIData" :key="posts.id">
      <b-container>
        <b-row>
          {{posts.title}}
        </b-row>
        <b-row>
          {{posts.content}}
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar"
  import { getAPI } from '../axios.api'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: 'Posts',
    data() {
      return{
        APIData: []
      }
    },
    components:{
      Navbar
    },
    created() {
      getAPI.get('/posts/',)
        .then(response => {
          console.log('Post API has recieved data')
          this.APIData = response.data
        })
      .catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>

</style>