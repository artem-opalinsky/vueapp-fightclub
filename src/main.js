import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from "bootstrap-vue"


Vue.config.productionTip = false
Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({ name: 'login' })
    } else {
      if (to.matched.some(record => record.meta.requiresEnterRoom)){
        if(!store.getters.enteredRoom){
          next({name: 'selectroom'})
        } else next()
      }
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresLogged)) {
    if (store.getters.loggedIn && store.getters.enteredRoom) {
      next({ name: 'game' })
    } else if (store.getters.loggedIn && !store.getters.enteredRoom) {
      next({name: 'selectroom'})
    } else next()
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
