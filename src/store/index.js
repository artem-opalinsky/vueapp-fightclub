import Vue from 'vue'
import Vuex from 'vuex'
import {APIUserLogin, APIUserAction, handlingData, APIRefreshToken} from "@/axios.api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('access_token') || null,
        refreshToken: localStorage.getItem('refresh_token') || null,
        totalDamage: 0,
        enemyDamage: 0,
        currentDamage: [],
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
        updateActionStorage (state, {totalDamage, enemyDamage, responseObj}) {
            state.totalDamage = totalDamage
            state.enemyDamage = enemyDamage
            state.currentDamage.push(responseObj)
        },
        updateTotalDamage (state, {totalDamage, enemyDamage}){
            state.totalDamage = totalDamage
            state.enemyDamage = enemyDamage
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
        async refreshToken (context) {
            try {
                const response = await APIRefreshToken(context)
                console.log('New access successfully generated')
                context.commit('updateAccess', response.data.access)
            } catch (err){
                console.log('error in refreshToken Task', err)
            }
        },
        async userAction (context, humans){
            context.commit('load')
            let sendHuman1 = Object.assign({isAttack:false},humans.Human1)
            let sendHuman2 = Object.assign({isAttack:true},humans.Human2)
            APIUserAction(sendHuman1)
            const response = await APIUserAction(sendHuman2)
            handlingData(response, context)
        },

        async userLogin (context, usercredentials) {
            const response = await APIUserLogin(usercredentials)
            context.commit('updateStorage', {
                access: response.data.access,
                refresh: response.data.refresh,
            })
            console.log(response.data.access)
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
