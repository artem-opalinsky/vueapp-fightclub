import Vue from 'vue'
import Vuex from 'vuex'
import {getAPI} from "@/axios.api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        APIData: '',
        accessToken: localStorage.getItem('access_token') || null,
        refreshToken: localStorage.getItem('refresh_token') || null,
        scoreFirst: 0,
        scoreSecond: 0,
        loading: false,
        gameRound: 1,
    },
    mutations: {
        updateStorage (state, { access, refresh }) {
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            state.accessToken = access
            state.refreshToken = refresh
        },
        destroyToken (state) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            state.accessToken = null
            state.refreshToken = null
        },
        updateActionStorage (state, {scoreFirst}) {
            state.scoreFirst = scoreFirst

        },
        updateAccess (state, access) {
            localStorage.setItem('access_token', access)
            state.accessToken = access
        },
        load(state){
            state.loading = true
        },
        stopLoad(state){
            state.loading = false
        },
        gameChangeRound(state){
            state.gameRound++
        }
    },
    getters:{
        loggedIn (state) {
            return state.accessToken != null
        }
    },
    actions: {
        refreshToken (context) {
            return new Promise((resolve, reject) => {
                getAPI.post('/api-token-refresh/', {
                    refresh: context.state.refreshToken
                }) // send the stored refresh token to the backend API
                    .then(response => { // if API sends back new access and refresh token update the store
                        console.log('New access successfully generated')
                        context.commit('updateAccess', response.data.access)
                        resolve(response.data.access)
                    })
                    .catch(err => {
                        console.log('error in refreshToken Task')
                        reject(err) // error generating new access and refresh token because refresh token has expired
                    })
            })
        },
        async userAction (context, humancredentials){
            return new Promise((resolve) => {
                context.commit('load')
                humancredentials.Human1.isAttack = false
                humancredentials.Human2.isAttack = true
                getAPI.post('/human/', humancredentials.Human1,
                    {headers: {Authorization: `Bearer ${context.state.accessToken}`}})
                getAPI.post('/human/', humancredentials.Human2,
                    {headers: {Authorization: `Bearer ${context.state.accessToken}`}})
                    .then(response => {
                        if (response.data.total_damage === null) {
                            let polling = setInterval(() => {
                                getAPI.get('/human/', {headers: {Authorization: `Bearer ${context.state.accessToken}`}})
                                    .then(response => {
                                        if (response.data.total_damage !== null){
                                            clearInterval(polling)
                                            context.commit('updateActionStorage', {
                                                scoreFirst: response.data.total_damage,
                                            })
                                            context.commit('gameChangeRound')
                                            context.commit('stopLoad')
                                        }
                                    })
                            }, 1000)
                        }
                        else {
                            context.commit('updateActionStorage', {
                                scoreFirst: response.data.total_damage,

                            })
                            context.commit('stopLoad')
                            context.commit('gameChangeRound')
                        }
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
