<template>
  <div class="game">
    <Navbar />
    <Loader
        v-if="loading"

    />
      <b-container>
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
            <b-col class="centerblock">1st player{{ disabledHuman1 }}</b-col>
            <b-col class="centerblock">Score: {{ scoreFirst }}</b-col>
            <p>{{ Human1 }}</p>
            <Human
              v-bind:humandefense="true"
              v-on:send-human="getHuman1"
              v-on:send-disabled="getDisabled1"
            />
          </b-col>
          <b-col class="frame">
            <b-col class="centerblock">2nd player{{disabledHuman2}}</b-col>
            <b-col class="centerblock">Score:</b-col>
            <p>{{ Human2 }}</p>
            <Human
                v-bind:humanattack="true"
                v-on:send-human="getHuman2"
                v-on:send-disabled="getDisabled2"
            />
          </b-col>
          <b-col class="frame">
            Действия:
          </b-col>
        </b-row>
        <b-row>
          <b-button block variant="primary" class="marginbtn" v-on:click="onReady"
          :disabled="!disabledHuman1 || !disabledHuman2"
          >Ready!!!</b-button>
        </b-row>
      </b-container>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar"
  import {getAPItoken} from '@/axios.api'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { mapState } from 'vuex'
  import Human from "@/components/Human";
  import Loader from "@/components/Loader"

  export default {
    name: 'Game',
    data(){
      return{
        Human1:{},
        Human2:{},
        disabledHuman1:false,
        disabledHuman2:false
      }
    },
    components:{
      Navbar,
      Human,
      Loader
    },
    computed: mapState(['APIData', 'accessToken', 'loading', 'scoreFirst']),
    methods:{
      getDisabled1(man){
        this.$data.disabledHuman1 = man
      },
      getDisabled2(man){
        this.$data.disabledHuman2 = man
      },
      getHuman1(human){
        this.$data.Human1 = human
      },
      getHuman2(human){
        this.$data.Human2 = human
      },
      onReady(){
        this.$store.dispatch('userAction',{
          Human1 : this.Human1,
          Human2 : this.Human2
        })
        .then(() => {
          // this.$router.push({ name: 'game' })
        })
        .catch(err => {
          console.log(err)
        })

      }
    },
    created() {
      getAPItoken.get('/posts/', {headers:{ Authorization: `Bearer ${this.$store.state.accessToken}`}})
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