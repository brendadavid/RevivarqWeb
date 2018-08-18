import axios from 'axios'
import * as crypto from 'crypto-js'
import {api} from 'configs/'
//import * as querystring from 'querystring'

export const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    validToken(token, (error, success) => {
        if(success) {
            return true
        } else {
            console.error(error)
            localStorage.removeItem('token')
            login(username, password, false, (error, success) => {
                if(error) {
                    return false
                } else {
                    return true
                }
            })
        }
    })
}

export const login = (user_name, password, encrypt_password, callback) => {
    const params = { // Parametro de login Usuario e Senha
        user_name: user_name,
        password: encrypt_password ? crypto.SHA256(password).toString() : password,
    }
    axios({
        method: 'post',
        url: `${api}/login`,
        data: params,
        timeout: 5000,
        headers: { 
            'Content-Type': 'application/json' 
        }
    })
    .then( response => {
        const api_response = response.data
        if(api_response.data) {
            if(api_response.data.token) {
                localStorage.setItem('token', api_response.data.token)
                localStorage.setItem('username', params.user_name)
                localStorage.setItem('password', params.password)
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

export const logout = (callback) => {
    console.log('Deslogado')
    localStorage.removeItem('token')
    callback()
}

export const validToken = (token, callback) => {
    axios({
        method: 'get',
        url: `${api}/self/token`,
        timeout: 5000,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Passando o token de autorização
        }
    })
    .then( response => {
        const api_response = response.data
        callback(null, api_response)
        return false
    })
    .catch( error => {
        let errorObj = { statusDesc: error, statusCode: 2 }
        callback(errorObj, null)
        return false
    })
}