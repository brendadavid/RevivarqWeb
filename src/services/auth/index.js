import axios from 'axios'
import * as crypto from 'crypto-js'
import { HTTPStatusCodes } from 'configs/constants';
//import * as querystring from 'querystring'

import {api_login, api_verify_token} from 'configs/api_routes'

export const login = async (username, password, encrypt_password) => {
    const route = api_login()
    console.log(route)

    const params = {
        username: username,
        password: encrypt_password ? crypto.SHA256(password).toString() : password,
    }

    console.log(params.password)

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
        console.log(api_response)
        const responseData = api_response.data

        if(responseData) {
            token = api_response.data.token
        }

        if(token) {
            localStorage.setItem('token', token)
            localStorage.setItem('username', params.username)
            localStorage.setItem('password', params.password)
            console.log('Login Success Response: ', api_response)
            return api_response
        }
        console.error('Login Failure Response: ', api_response)
        return api_response
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: HTTPStatusCodes.InternalServerError }
    }
}

export const logout = () => {
    console.log('Deslogado...')
    localStorage.removeItem('token')
}

export const validToken = async() => {
    const route = api_verify_token()
    const token = localStorage.getItem('token')

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
        //console.log('Valid token response:', responseData)
        return isAuthenticated
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: HTTPStatusCodes.InternalServerError }
    }
}