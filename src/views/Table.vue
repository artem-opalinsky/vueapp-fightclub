<template>
  <div class="table">
    <Navbar />
    <b-container>
      <b-row class="padding-row">
        <b-col>
          <b-input type="text" placeholder="Поиск"></b-input>
        </b-col>
        <label :for="drop1">Тип:</label>
        <b-col>
          <b-select id="drop1" class="m-md-2">
            <b-select-option value="all">Удар и Защита</b-select-option>
            <b-select-option value="attack">Удар</b-select-option>
            <b-select-option value="defense">Защита</b-select-option>
          </b-select>
        </b-col>
        <label :for="date1">с</label>
        <b-col>
          <b-input id="date1" type="date"></b-input>
        </b-col>
        <label :for="date2">по</label>
        <b-col>
          <b-input id="date2" type="date" ></b-input>
        </b-col>
      </b-row>
      <b-table striped hover :items="items"  :fields="fields"></b-table>

    </b-container>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import {getAPItoken} from "@/axios.api";
export default {
  components: {Navbar},
  data() {
    return {
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
              else {
                let b = 1
                b = b*2
              }
            }
            this.$data.items.push(response.data[i])
          }

      })
  }
}
</script>

<style scoped>
.padding-row{
  margin-top: 1rem;
}

</style>