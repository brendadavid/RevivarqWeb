import axios from 'axios'
import * as crypto from 'crypto-js'
import {api} from 'configs/'
//import * as querystring from 'querystring'

export const create = (user, callback) => {
    const params = {
        ...user,
        password: crypto.SHA256(user.password).toString(),
    }
    console.log(params)
    axios({
        method: 'post',
        url: `${api}/users`,
        data: params,
        timeout: 5000,
        headers: { 
			'Content-Type': 'application/json', // Declarando que estou passando um JSON como body da request
			'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then( response => {
        const api_response = response.data
        if(api_response.data) {
            if(api_response.data.token) {
                localStorage.setItem('token', api_response.data.token)
                callback(null, response.data.token)
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