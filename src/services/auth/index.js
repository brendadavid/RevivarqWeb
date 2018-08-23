import axios from 'axios'
import * as crypto from 'crypto-js'
import { Constants } from 'configs/constants';
// import * as querystring from 'querystring'

import {api_login, api_verify_token} from 'configs/api_routes'

export const login = async (username, password, encrypt_password) => {
    const route = api_login()

    const params = {
        username: username,
        password: encrypt_password ? crypto.SHA256(password).toString() : password,
    }

    const response = await axios({
        method: route.method,
        url: route.url,
        data: params,
        timeout: 5000,
        headers: { 
            'Content-Type': 'application/json' 
        }
    })

    if(response) {
        let token
        const api_response = response.data
        const responseData = api_response.data

        if(responseData) {
            token = api_response.data.token
        }

        if(token) {
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('username', params.username)
            sessionStorage.setItem('password', params.password)
            return api_response
        }
        return api_response
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
    }
}

export const logout = () => {
    sessionStorage.removeItem('token')
}

export const validToken = async() => {
    const route = api_verify_token()
    const token = sessionStorage.getItem('token')

    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Passando o token de autorização
        }
    })

    if(response) {
        const responseData = response.data
        const isAuthenticated = responseData.data
        return isAuthenticated
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
    }
}