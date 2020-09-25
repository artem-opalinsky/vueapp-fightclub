<template>
  <div>
    <b-row>
      <b-col class="centerblock">
        <b-button class="head"
              :class="{'blue-color' : human.head && this.$props.humandefense, 'red-color' : human.head && this.$props.humanattack }"
              :disabled="humanDisabled && !human.head"
              v-on:click="human.head = !human.head">
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="centerblock">
        <b-button class="left-hand hand"
              :class="{'blue-color' : human.leftHand && this.$props.humandefense, 'red-color' : human.leftHand && this.$props.humanattack }"
              :disabled="humanDisabled && !human.leftHand"
              v-on:click="human.leftHand = !human.leftHand">
        </b-button>
        <b-button class="body"
              :class="{'blue-color' : human.body && this.$props.humandefense, 'red-color' : human.body && this.$props.humanattack }"
              :disabled="humanDisabled && !human.body"
              v-on:click="human.body = !human.body">
        </b-button>
        <b-button class="right-hand hand"
              :class="{'blue-color' : human.rightHand && this.$props.humandefense, 'red-color' : human.rightHand && this.$props.humanattack }"
              :disabled="humanDisabled && !human.rightHand"
              v-on:click="human.rightHand = !human.rightHand">
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="centerblock">
        <b-button class="left-leg leg"
             :class="{'blue-color' : human.leftLeg && this.$props.humandefense, 'red-color' : human.leftLeg && this.$props.humanattack }"
             :disabled="humanDisabled && !human.leftLeg"
             v-on:click="human.leftLeg = !human.leftLeg">
        </b-button>
        <b-button class="right-leg leg"
              :class="{'blue-color' : human.rightLeg && this.$props.humandefense, 'red-color' : human.rightLeg && this.$props.humanattack }"
              :disabled="humanDisabled && !human.rightLeg"
              v-on:click="human.rightLeg = !human.rightLeg">
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapState } from 'vuex'

export default {
  data(){
    return{
      human: {
        head: false,
        body: false,
        leftHand: false,
        rightHand: false,
        leftLeg: false,
        rightLeg: false

      }
    }
  },
  props: ['humandefense', 'humanattack'],
  computed:{
    humanDisabled: function() {
      let counter = 0;
      for (let item in this.human) {
        if (this.human[item]) {
          counter++
        }
      }
      if (counter > 2) {
        return true
      } else {
        return false
      }
    },
    ...mapState(['gameRound']),
  },
  watch:{
    humanDisabled: function (){
      this.$emit('send-disabled', this.humanDisabled)
    },
    gameRound: function (){
      this.$data.human.head = false
      this.$data.human.body = false
      this.$data.human.leftHand = false
      this.$data.human.rightHand = false
      this.$data.human.leftLeg = false
      this.$data.human.rightLeg = false
    }
  },
  created() {
    this.$emit('send-human', this.human)
  },
  methods:{

  },
  name: "Human"
}
</script>

<style scoped>
.blue-color {
  background-color: #0022ff !important;
}
.red-color {
  background-color: red !important;
}
.head{
  background-color:#fff;
  width:100px;
  height:100px;
  border-radius:50px;
  border: 1px solid #000;
}
.body{
  background-color:#fff;
  width:100px;
  height:200px;
  border: 1px solid #000;
}
.hand{
  background-color:#fff;
  width:50px;
  height:160px;
  border: 1px solid #000;
}
.leg{
  background-color:#fff;
  width:50px;
  height:130px;
  border: 1px solid #000;
}
.centerblock{
  display: flex;
  justify-content: center;
}
</style>