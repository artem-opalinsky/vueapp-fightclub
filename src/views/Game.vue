<template>
  <div class="game">
    <Navbar />
      <b-container
      >
        <b-row>
          <div v-for="posts in APIData" :key="posts.id">
            <b-card :title = 'posts.title'>
              <b-card-text>
                {{ posts.content }}
              </b-card-text>
            </b-card>
          </div>
        </b-row>
        <b-row>
          <b-col class="frame">
            <b-col class="centerblock">1st player</b-col>
            <b-col class="centerblock">Score:</b-col>
            <p>{{ Human1 }}</p>
            <Human
              v-bind:humandefense="true"
              v-on:send-humanTest2="getHuman1"

            />
          </b-col>
          <b-col class="frame">
            <b-col class="centerblock">2nd player</b-col>
            <b-col class="centerblock">Score:</b-col>
            <p>{{ Human2 }}</p>
            <Human
                v-bind:humanattack="true"
                v-on:send-humanTest2="getHuman2"
            />
          </b-col>
          <b-col class="frame">
            Действия:
          </b-col>
        </b-row>
        <b-row>
          <b-button block variant="primary" class="marginbtn" v-on:click="onReady">Ready!!!</b-button>
        </b-row>
      </b-container>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar"
  import { getAPI } from '@/axios.api'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { mapState } from 'vuex'
  import Human from "@/components/Human";

  export default {
    name: 'Game',
    data(){
      return{
        Human1:{},
        Human2:{}
      }
    },
    components:{
      Navbar,
      Human
    },
    computed: mapState(['APIData']),
    methods:{
      getHuman1(human){
        this.$data.Human1 = human
      },
      getHuman2(human){
        this.$data.Human2 = human
      },
      onReady(){
        getAPI.post('/human/', ['Human1', 'Human2'])
        .then(response => {
          this.$store.state.firstscore = response.data
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      getAPI.get('/posts/', {headers:{ Authorization: `Bearer ${this.$store.state.jwt}`}})
        .then(response => {
          this.$store.state.APIData = response.data
          this.$store.state.auth = true
        })
      .catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>
.frame{
  border: 1px solid #000;
  border-radius: 5px;
  padding: 15px;
  margin: 2rem;
}
.marginbtn{
  margin: 2rem;
}
.centerblock{
  display: flex;
  justify-content: center;
}
</style>