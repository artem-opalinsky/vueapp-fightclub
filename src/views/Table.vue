<template>
  <div class="table">
    <Navbar />
    <b-container>
      <b-row class="margin-row">
        <b-col>
          <b-input type="text" placeholder="Поиск"
            v-model="searchValue"
          ></b-input>
        </b-col>
        <label class="margin-top">Тип:</label>
        <b-col>
          <b-select class="m-md-2 margin0"
            v-model="typeSelectValue"
            v-on:change="sort"
          >
            <b-select-option value="all">Удар и Защита</b-select-option>
            <b-select-option value="attack">Удар</b-select-option>
            <b-select-option value="defense">Защита</b-select-option>
          </b-select>
        </b-col>
        <label class="margin-top">с</label>
        <b-col>
          <b-input type="date"
            v-model="fromDate"
            v-on:change="sort"
          ></b-input>
        </b-col>
        <label class="margin-top">по</label>
        <b-col>
          <b-input type="date"
            v-model="toDate"
            v-on:change="sort"
          ></b-input>
        </b-col>
      </b-row>
      <b-table striped hover :items="items"  :fields="fields"></b-table>
    </b-container>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import { getAPItoken } from "@/axios.api";
import { mapState } from 'vuex';
export default {
  components: {Navbar},
  data() {
    return {
      typeSelectValue: null,
      fromDate: null,
      toDate: null,
      searchValue: null,
      fields: ['user', 'date', 'isAttack', 'head', 'body', 'leftHand', 'rightHand', 'leftLeg', 'rightLeg'],
      items: [
        // { 'Игрок': 'Игрок 1', Дата_и_время: '10-09-2020 14:19', Тип: 'Удар', Голова: 'Да', Тело: 'Нет', Левая_рука: 'Нет', Правая_рука: 'Нет', Левая_нога: 'Нет', Правая_нога: 'Нет' },
        // { user: 'Игрок 2', Дата_и_время: '10-09-2020 14:22', Тип: 'Защита', Голова: 'Нет', Тело: 'Нет', Левая_рука: 'Да', Правая_рука: 'Нет', Левая_нога: 'Нет', Правая_нога: 'Нет' },
        // { user: 'Игрок 2', Дата_и_время: '10-09-2020 14:19', Тип: 'Удар', Голова: 'Нет', Тело: 'Да', Левая_рука: 'Нет', Правая_рука: 'Нет', Левая_нога: 'Нет', Правая_нога: 'Нет' },
        // { user: 'Игрок 1', Дата_и_время: '10-09-2020 14:22', Тип: 'Защита', Голова: 'Нет', Тело: 'Нет', Левая_рука: 'Нет', Правая_рука: 'Нет', Левая_нога: 'Нет', Правая_нога: 'Да' }
      ],

    }
  },
  created() {
    getAPItoken.get('/statistics/', {headers:{ Authorization: `Bearer ${this.$store.state.accessToken}`}})
      .then(response => {
          for (let i in response.data){
            for (let j in response.data[i]){
              if (response.data[i][j] === true) response.data[i][j] = 'Да'
              else if (response.data[i][j] === false) response.data[i][j] = 'Нет'
              else if (response.data[i][j] === 1) response.data[i][j] = 'Игрок 1'
              else if (response.data[i][j] === 2) response.data[i][j] = 'Игрок 2'
            }
            this.$data.items.push(response.data[i])
          }

      })
  },
  computed:mapState(['accessToken']),
  methods:{
    sort(){
      console.log(this.$data.searchValue)
      console.log(this.$data.typeSelectValue)
      console.log(this.$data.fromDate)
      console.log(this.$data.toDate)
      getAPItoken.post('/statistics/',{
        isAttack: this.$data.typeSelectValue,
        fromDate: this.$data.fromDate,
        toDate: this.$data.toDate
      },{headers:{ Authorization: `Bearer ${this.$store.state.accessToken}`}})
      .then(response => {
        this.$data.items = []
        for (let i in response.data){
          for (let j in response.data[i]){
            if (response.data[i][j] === true) response.data[i][j] = 'Да'
            else if (response.data[i][j] === false) response.data[i][j] = 'Нет'
            else if (response.data[i][j] === 1) response.data[i][j] = 'Игрок 1'
            else if (response.data[i][j] === 2) response.data[i][j] = 'Игрок 2'
          }
          this.$data.items.push(response.data[i])
        }
      })
    }
  },
}
</script>

<style scoped>
.margin-row{
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.margin0{
  margin: 0 !important;
}

.margin-top{
  margin-top: 0.3rem;
}
</style>