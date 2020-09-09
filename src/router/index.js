import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'game',
            component: () => import('../views/Game'),
            meta: {
                requiresLogin: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/Logout')
        }

    ]
})