<template>
  <div class="log">

  </div>
</template>

<script>
  export default {
    created() {
      this.$store.commit('exitCurrentRoom')
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push({ name: 'login'})
        })
    }
  }
</script>

<style>

</style>