<template>
  <div class="table">
    <Navbar />
    <b-container>
      <b-row class="margin-row">
        <b-col>
          <b-input type="text" placeholder="Поиск по имени"
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
          <b-input type="date" required
            v-model="fromDate"
            v-on:change="sort"
          ></b-input>
        </b-col>
        <label class="margin-top">по</label>
        <b-col>
          <b-input type="date" required
            v-model="toDate"
            v-on:change="sort"
          ></b-input>
        </b-col>
      </b-row>
      <b-table striped hover :items="filteredItems"  :fields="fields"></b-table>
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
      searchValue: '',
      fields: ['user', 'date', 'isAttack', 'head', 'body', 'leftHand', 'rightHand', 'leftLeg', 'rightLeg'],
      items: [],

    }
  },

  async created() {
    const response = await getAPItoken.get('/statistics/', {headers:{ Authorization: `Bearer ${this.$store.state.accessToken}`}})
    for (let i in response.data){
      for (let j in response.data[i]){
        if (response.data[i][j] === true) response.data[i][j] = 'Да'
        else if (response.data[i][j] === false) response.data[i][j] = 'Нет'
        else if (response.data[i][j] === 1) response.data[i][j] = 'Игрок 1'
        else if (response.data[i][j] === 2) response.data[i][j] = 'Игрок 2'
      }
      this.$data.items.push(response.data[i])
    }
  },
  computed:{
    filteredItems: function (){
      return this.items.filter(item => {
        if (this.searchValue === '') return true
        else return item.user.indexOf(this.searchValue) !== -1
      })
    },
    ...mapState(['accessToken']),
  },

  methods:{
    async sort(){
      const response = await getAPItoken.post('/statistics/',{
        isAttack: this.$data.typeSelectValue,
        fromDate: this.$data.fromDate,
        toDate: this.$data.toDate
      },{headers:{ Authorization: `Bearer ${this.$store.state.accessToken}`}})
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