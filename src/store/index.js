import Vue from 'vue'
import Vuex from 'vuex'
import {getAPI} from "@/axios.api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // accessToken: null,
        // refreshToken: null,
        APIData: '',
        jwt: localStorage.getItem('token'),
        auth: false,
    },
    mutations: {
        updateStorage (state, { access }) {
            // state.accessToken = access
            // state.refreshToken = refresh
            localStorage.setItem('token', access)
            state.jwt = access
            state.auth = true
        },
        destroyToken (state) {
            // state.accessToken = null
            // state.refreshToken = null
            localStorage.removeItem('token')
            state.jwt = null
            state.auth = false
        }
    },
    getters:{
        loggedIn (state) {
            return state.auth
        }
    },
    actions: {
        userLogin (context, usercredentials) {
            return new Promise((resolve) => {
                getAPI.post('/api-token/', {
                    username: usercredentials.login,
                    password: usercredentials.password
                })
                    .then(response => {
                        context.commit('updateStorage', {
                            access: response.data.access,
                            refresh: response.data.refresh,
                        })
                        console.log(response.data.access)
                        resolve()

                    })
            })
        },
        userLogout(context) {
            if (context.getters.loggedIn) {
                context.commit('destroyToken')
            }
        }
    },
    modules: {
    }
})
