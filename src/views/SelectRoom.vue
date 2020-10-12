<template>
  <RoomList />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import RoomList from "@/components/RoomList";
import {getAPItoken} from "@/axios.api";
export default {
  name: "SelectRoom",
  components: {RoomList},
  async mounted() {
    const response = await getAPItoken.get('/rooms/',{headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}})
    this.$store.state.roomList = response.data
    console.log(this.$store.state.roomList)
  }
}
</script>

<style scoped>

</style>