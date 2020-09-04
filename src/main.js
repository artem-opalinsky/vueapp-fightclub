import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from "bootstrap-vue"


Vue.config.productionTip = false
Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.getters.loggedIn) {
      next({name: 'login'})
    } else {
      next()
    }
  } else {
    next
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
