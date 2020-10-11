import axios from 'axios'
import store from './store'

const APIUrl = 'http://127.0.0.1:8000'
const getAPI = axios.create({
    baseURL: APIUrl,
    timeout: 1000,
    headers: { contentType: 'application/json' }
})

const getAPItoken = axios.create({
    baseURL: APIUrl
})

const APIUserLogin = (usercredentials) => getAPItoken.post('/api-token/',{
    username: usercredentials.login,
    password: usercredentials.password
})

const APIRefreshToken = (context) => getAPItoken.post('/api-token-refresh/', {refresh: context.state.refreshToken})

const APIUserAction = (human) => getAPItoken.post('/human/', human, {headers: {Authorization: `Bearer ${store.state.accessToken}`}})

const handlingData = (response, context) => {
    if (response.data.current_damage === null) {
        let polling = setInterval(async () => {
            const secondResponse = await getAPI.get('/human/', {headers: {Authorization: `Bearer ${context.state.accessToken}`, data: {roomId:context.state.currentRoom}}})
            if (secondResponse.data.current_damage !== null){
                clearInterval(polling)
                let resp = { damage:secondResponse.data.current_damage, enemyDamage: secondResponse.data.current_enemy_damage}
                context.commit('updateActionStorage', {
                    totalDamage: secondResponse.data.total_damage,
                    enemyDamage: secondResponse.data.enemy_damage,
                    currentDamage: secondResponse.data.current_damage,
                    currentEnemyDamage: secondResponse.data.current_enemy_damage,
                    responseObj: resp
                })
                context.commit('gameChangeRound')
                context.commit('stopLoad')
            }
        }, 1000)
    }
    else {
        let resp = { damage:response.data.current_damage, enemyDamage: response.data.current_enemy_damage}
        context.commit('updateActionStorage', {
            totalDamage: response.data.total_damage,
            enemyDamage: response.data.enemy_damage,
            currentDamage: response.data.current_damage,
            currentEnemyDamage: response.data.current_enemy_damage,
            responseObj: resp
        })
        context.commit('stopLoad')
        context.commit('gameChangeRound')
    }
}

getAPItoken.interceptors.response.use(undefined, function (err) {
    if (err.config && err.response && err.response.status === 401) {
        console.log('Сработала ошибка!')
        store.dispatch('refreshToken')
            .then(access => {
                axios.request({
                    baseURL: APIUrl,
                    method: 'get',
                    headers: { Authorization: `Bearer ${access}` },
                    url: '/human/'
                }).then(response => {
                    console.log('Success getting the posts')
                    store.commit('updateTotalDamage',{
                        totalDamage: response.data.total_damage,
                        enemyDamage: response.data.enemy_damage
                    })
                }).catch(err => {
                    console.log('Got the new access token but error while trying to fetch data from the API using it')
                    return Promise.reject(err)
                })
            })
            .catch(err => {
                return Promise.reject(err)
            })
    }
})



export {
    getAPI, getAPItoken, APIUserLogin, APIUserAction, handlingData, APIRefreshToken
}