<template>
  <div class="game">
    <Navbar />
    <Loader
        v-if="loading"
    />
      <b-container>
        <b-row>
          <b-col class="frame">
            <b-col class="centerblock">1 игрок</b-col>
            <b-col class="centerblock">Счет: {{ totalDamage }}</b-col>
            <Human
              v-bind:humandefense="true"
              v-on:send-human="getHuman1"
              v-on:send-disabled="getDisabled1"
            />
          </b-col>
          <b-col class="frame">
            <b-col class="centerblock">2 игрок</b-col>
            <b-col class="centerblock">Счет: {{ enemyDamage }}</b-col>
            <Human
                v-bind:humanattack="true"
                v-on:send-human="getHuman2"
                v-on:send-disabled="getDisabled2"
            />
          </b-col>
          <b-col class="frame overflow">
            Действия:
              <b-col v-for="(damage, index) in currentDamage" :key="index">
                <b>{{index + 1}} раунд</b> <br>
                Игрок 1 бьет Игрока 2 и наносит {{ damage.damage }} урона <br>
                Игрок 2 бьет Игрока 1 и наносит {{ damage.enemyDamage }} урона
                <hr>
              </b-col>
          </b-col>
        </b-row>
        <b-row>
          <b-button block variant="primary" class="marginbtn" v-on:click="onReady"
          :disabled="!disabledHuman1 || !disabledHuman2"

          >Готово</b-button>
        </b-row>
      </b-container>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar"
  import { mountGameAPI } from '@/axios.api'
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
    computed: mapState(['accessToken', 'loading', 'totalDamage', 'enemyDamage', 'currentDamage', 'roomList']),
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
        .catch(err => {
          console.log(err)
        })
      }
    },
    async mounted() {
      try {
        const response = await mountGameAPI()
        this.$store.commit('updateTotalDamage',{
          totalDamage: response.data.total_damage,
          enemyDamage: response.data.enemy_damage
        })
      } catch(err){
        console.log(err)
      }
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

.overflow{
  overflow-y: scroll;
  height: 510px;
}
</style>