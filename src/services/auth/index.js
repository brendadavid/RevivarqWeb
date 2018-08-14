import axios from 'axios'
import * as crypto from 'crypto-js'

export const login = (user_name, password, callback) => {
    const params = {
        user_name: user_name,
        password: crypto.SHA256(password),
    }
    console.log(params.password.toString())

    axios({
        method: 'post',
        url: 'http://localhost:4000/fluxoapi/login',
        data: params
    })
    .then( response => {
        const api_response = response.data
        if(api_response.data) {
            if(api_response.data.token) {
                localStorage.setItem('token', api_response.data.token)
                callback(null, response.data)
                return true
            }
        }
        callback(api_response, null)
        return false
    })
    .catch( error => {
        callback(error, null)
        return false
    })
}