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
        scoreFirst: 0,
        scoreSecond: 0
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
        },
        updataActionStorage (state, {scoreFirst, scoreSecond}) {
            state.scoreFirst = scoreFirst
            state.scoreSecond =scoreSecond
        }
    },
    getters:{
        loggedIn (state) {
            return state.auth
        }
    },
    actions: {
        userAction (context, humancredentials){
            return new Promise((resolve) => {
                getAPI.post('/human/', {
                    humandefense: humancredentials.Human1,
                    humanattack: humancredentials.Human2
                })
                    .then(response => {
                        context.commit('updateActionStorage', {
                            scoreFirst: response.data.scorefirst,
                            scoreSecond: response.data.scoresecond
                        })
                        console.log(response.data)
                        resolve()
                    })
            })
        },
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
