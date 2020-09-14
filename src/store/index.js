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
        scoreSecond: 0
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
        updateActionStorage (state, {scoreFirst, scoreSecond}) {
            state.scoreFirst = scoreFirst
            state.scoreSecond = scoreSecond
        },
        updateAccess (state, access) {
            localStorage.setItem('access_token', access)
            state.accessToken = access
        },
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
        userAction (context, humancredentials){
            return new Promise((resolve) => {
                getAPI.post('/human/', humancredentials.Human1,
                    {headers: {Authorization: `Bearer ${context.state.accessToken}`}})
                    .then(() => {
                        getAPI.post('/human/', humancredentials.Human2,
                            {headers: {Authorization: `Bearer ${context.state.accessToken}`}})
                    })
                    .then(response => {
                        context.commit('updateActionStorage', {
                            scoreFirst: response.data.scorefirst,
                            scoreSecond: response.data.scoresecond
                        })
                        console.log('khkjb')
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
