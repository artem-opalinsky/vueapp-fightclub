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
                requiresAuth: true,
                requiresEnterRoom: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login'),
            meta: {
                requiresLogged: true
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/Logout'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/table',
            name: 'table',
            component: () => import('../views/Table'),
            meta: {
                requiresAuth: true,
                requiresEnterRoom: true
            }
        },
        {
            path: '/selectroom',
            name: 'selectroom',
            component: () => import('../views/SelectRoom'),
            meta: {
                requiresAuth: true
            }
        }

    ]
})