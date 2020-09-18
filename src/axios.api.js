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
getAPItoken.interceptors.response.use(undefined, function (err) {
    if (err.config && err.response && err.response.status === 401) {
        console.log('Сработала ошибка!')
        store.dispatch('refreshToken')
            .then(access => {
                axios.request({
                    baseURL: APIUrl,
                    method: 'get',
                    headers: { Authorization: `Bearer ${access}` },
                    url: '/posts/'
                }).then(response => {
                    console.log('Success getting the posts')
                    store.state.APIData = response.data
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
    getAPI, getAPItoken
}