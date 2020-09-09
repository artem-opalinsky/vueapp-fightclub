<template>
  <div>
    <b-row>
      <b-col class="centerblock">
        <b-button class="head"
              :class="{'blue-color' : humanTest2.head && this.$props.humandefense, 'red-color' : humanTest2.head && this.$props.humanattack }"
              :disabled="human2Disabled && !humanTest2.head"
              v-on:click="humanTest2.head = !humanTest2.head">
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="centerblock">
        <b-button class="left-hand hand"
              :class="{'blue-color' : humanTest2.leftHand && this.$props.humandefense, 'red-color' : humanTest2.leftHand && this.$props.humanattack }"
              :disabled="human2Disabled && !humanTest2.leftHand"
              v-on:click="humanTest2.leftHand = !humanTest2.leftHand">
        </b-button>
        <b-button class="body"
              :class="{'blue-color' : humanTest2.body && this.$props.humandefense, 'red-color' : humanTest2.body && this.$props.humanattack }"
              :disabled="human2Disabled && !humanTest2.body"
              v-on:click="humanTest2.body = !humanTest2.body">
        </b-button>
        <b-button class="right-hand hand"
              :class="{'blue-color' : humanTest2.rightHand && this.$props.humandefense, 'red-color' : humanTest2.rightHand && this.$props.humanattack }"
              :disabled="human2Disabled && !humanTest2.rightHand"
              v-on:click="humanTest2.rightHand = !humanTest2.rightHand">
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="centerblock">
        <b-button class="left-leg leg"
             :class="{'blue-color' : humanTest2.leftLeg && this.$props.humandefense, 'red-color' : humanTest2.leftLeg && this.$props.humanattack }"
             :disabled="human2Disabled && !humanTest2.leftLeg"
             v-on:click="humanTest2.leftLeg = !humanTest2.leftLeg">
        </b-button>
        <b-button class="right-leg leg"
              :class="{'blue-color' : humanTest2.rightLeg && this.$props.humandefense, 'red-color' : humanTest2.rightLeg && this.$props.humanattack }"
              :disabled="human2Disabled && !humanTest2.rightLeg"
              v-on:click="humanTest2.rightHand = !humanTest2.rightLeg">
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  data(){
    return{
      counterfirst: 0,
      countersecond: 0,
      humanTest2: {
        leftHand: false,
        rightHand: false,
        body: false,
        head: false,
        leftLeg: false,
        rightLeg: false,
        count: 0
      }
    }
  },
  props: ['humandefense', 'humanattack'],
  computed: {
    human2Disabled () {
      let counter = 0;
      for (let item in this.humanTest2) {
        if (this.humanTest2[item]) {
          counter++
        }
      }
      if (counter > 2) {
        return true
      } else {
        return false
      }
    }
  },
  watch:{
    // humanTest2: {
    //   handler(){
    //     this.$emit('send-humanTest2', this.humanTest2)
    //     console.log('изменилось')
    //   },
    //   deep: true
    // }
  },
  created() {
    this.$emit('send-humanTest2', this.humanTest2)
  },
  methods:{
    // clickHead: function (event) {
    //   if (this.$props.humanfirst === true) {
    //     if (this.$data.counterfirst < 3) {
    //       if (!this.$props.Human1.activeHead) {
    //         event.target.style.backgroundColor = 'cornflowerblue'
    //         this.$props.Human1.activeHead = true
    //         this.$data.counterfirst++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeHead = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //   else if (this.$data.counterfirst === 3) {
    //       if (this.$props.Human1.activeHead){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeHead = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //   }
    //   else {
    //     if (this.$data.countersecond < 3){
    //       if (!this.$props.Human2.activeHead) {
    //         event.target.style.backgroundColor = 'red'
    //         this.$props.Human2.activeHead = true
    //         this.$data.countersecond++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeHead = false
    //         this.$data.countersecond--
    //       }
    //     }
    //     else if (this.$data.countersecond === 3) {
    //       if (this.$props.Human2.activeHead){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeHead = false
    //         this.$data.countersecond--
    //       }
    //     }
    //   }
    // },
    // clickBody: function (event)  {
    //   if (this.$props.humanfirst === true) {
    //     if (this.$data.counterfirst < 3) {
    //       if (!this.$props.Human1.activeBody) {
    //         event.target.style.backgroundColor = 'cornflowerblue'
    //         this.$props.Human1.activeBody = true
    //         this.$data.counterfirst++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeBody = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //     else if (this.$data.counterfirst === 3) {
    //       if (this.$props.Human1.activeBody){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeBody = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //   }
    //   else {
    //     if (this.$data.countersecond < 3){
    //       if (!this.$props.Human2.activeBody) {
    //         event.target.style.backgroundColor = 'red'
    //         this.$props.Human2.activeBody = true
    //         this.$data.countersecond++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeBody = false
    //         this.$data.countersecond--
    //       }
    //     }
    //     else if (this.$data.countersecond === 3) {
    //       if (this.$props.Human2.activeBody){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeBody = false
    //         this.$data.countersecond--
    //       }
    //     }
    //   }
    // },
    // clickLeftHand: function (event)  {
    //   if (this.$props.humanfirst === true) {
    //     if (this.$data.counterfirst < 3) {
    //       if (!this.$props.Human1.activeLeftHand) {
    //         event.target.style.backgroundColor = 'cornflowerblue'
    //         this.$props.Human1.activeLeftHand = true
    //         this.$data.counterfirst++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeLeftHand = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //     else if (this.$data.counterfirst === 3) {
    //       if (this.$props.Human1.activeLeftHand){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeLeftHand = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //   }
    //   else {
    //     if (this.$data.countersecond < 3){
    //       if (!this.$props.Human2.activeLeftHand) {
    //         event.target.style.backgroundColor = 'red'
    //         this.$props.Human2.activeLeftHand = true
    //         this.$data.countersecond++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeLeftHand = false
    //         this.$data.countersecond--
    //       }
    //     }
    //     else if (this.$data.countersecond === 3) {
    //       if (this.$props.Human2.activeLeftHand){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeLeftHand = false
    //         this.$data.countersecond--
    //       }
    //     }
    //   }
    // },
    // clickRightHand: function (event)  {
    //   if (this.$props.humanfirst === true) {
    //     if (this.$data.counterfirst < 3) {
    //       if (!this.$props.Human1.activeRightHand) {
    //         event.target.style.backgroundColor = 'cornflowerblue'
    //         this.$props.Human1.activeRightHand = true
    //         this.$data.counterfirst++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeRightHand = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //     else if (this.$data.counterfirst === 3) {
    //       if (this.$props.Human1.activeRightHand){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeRightHand = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //   }
    //   else {
    //     if (this.$data.countersecond < 3){
    //       if (!this.$props.Human2.activeRightHand) {
    //         event.target.style.backgroundColor = 'red'
    //         this.$props.Human2.activeRightHand = true
    //         this.$data.countersecond++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeRightHand = false
    //         this.$data.countersecond--
    //       }
    //     }
    //     else if (this.$data.countersecond === 3) {
    //       if (this.$props.Human2.activeRightHand){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeRightHand = false
    //         this.$data.countersecond--
    //       }
    //     }
    //   }
    // },
    // clickLeftLeg: function (event)  {
    //   if (this.$props.humanfirst === true) {
    //     if (this.$data.counterfirst < 3) {
    //       if (!this.$props.Human1.activeLeftLeg) {
    //         event.target.style.backgroundColor = 'cornflowerblue'
    //         this.$props.Human1.activeLeftLeg = true
    //         this.$data.counterfirst++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeLeftLeg = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //     else if (this.$data.counterfirst === 3) {
    //       if (this.$props.Human1.activeLeftLeg){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeLeftLeg = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //   }
    //   else {
    //     if (this.$data.countersecond < 3){
    //       if (!this.$props.Human2.activeLeftLeg) {
    //         event.target.style.backgroundColor = 'red'
    //         this.$props.Human2.activeLeftLeg = true
    //         this.$data.countersecond++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeLeftLeg = false
    //         this.$data.countersecond--
    //       }
    //     }
    //     else if (this.$data.countersecond === 3) {
    //       if (this.$props.Human2.activeLeftLeg){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeLeftLeg = false
    //         this.$data.countersecond--
    //       }
    //     }
    //   }
    // },
    // clickRightLeg: function (event)  {
    //   if (this.$props.humanfirst === true) {
    //     if (this.$data.counterfirst < 3) {
    //       if (!this.$props.Human1.activeRightLeg) {
    //         event.target.style.backgroundColor = 'cornflowerblue'
    //         this.$props.Human1.activeRightLeg = true
    //         this.$data.counterfirst++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeRightLeg = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //     else if (this.$data.counterfirst === 3) {
    //       if (this.$props.Human1.activeRightLeg){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human1.activeRightLeg = false
    //         this.$data.counterfirst--
    //       }
    //     }
    //   }
    //   else {
    //     if (this.$data.countersecond < 3){
    //       if (!this.$props.Human2.activeRightLeg) {
    //         event.target.style.backgroundColor = 'red'
    //         this.$props.Human2.activeRightLeg = true
    //         this.$data.countersecond++
    //       }
    //       else {
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeRightLeg = false
    //         this.$data.countersecond--
    //       }
    //     }
    //     else if (this.$data.countersecond === 3) {
    //       if (this.$props.Human2.activeRightLeg){
    //         event.target.style.backgroundColor = '#fff'
    //         this.$props.Human2.activeRightLeg = false
    //         this.$data.countersecond--
    //       }
    //     }
    //   }
    // },
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