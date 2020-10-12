<template>
  <div class="modal-mask">
    <div class="modal-container">
      <b-row class="justify-content-md-center">
        <p>Список комнат</p>
      </b-row>
      <div class="overflow-scroll">
        <b-row class="justify-content-md-center" v-for="(room, index) in roomList" :key="index">
          <b-col>Комната {{room["id"]}}<b-button pill variant="primary" v-on:click="enterRoom(room['id'])">Выбрать</b-button></b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {getAPItoken} from '@/axios.api.js'

export default {
  name: "RoomList",
  computed:mapState(['roomList', 'accessToken']),
  data(){
    return {
      responseData: null
    }
  },
  methods:{
    async enterRoom(roomId){
      const response = await getAPItoken.post('/rooms/',{id:roomId}, {headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}})
      this.$data.responseData = response.data
      this.$store.commit("setCurrentRoom", roomId)
      await this.$router.push({name: 'game'})
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 700px;
  height: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-size: 2.5rem;
  border-radius: 10px;
}

.overflow-scroll{
  height: 80%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>