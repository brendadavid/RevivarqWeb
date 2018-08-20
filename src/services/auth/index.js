import axios from 'axios'
import * as crypto from 'crypto-js'
import {api} from 'configs/'
import { HTTPStatusCodes } from 'configs/constants';
//import * as querystring from 'querystring'

export const login = async (user_name, password, encrypt_password) => {
    const params = {
        user_name: user_name,
        password: encrypt_password ? crypto.SHA256(password).toString() : password,
    }

    const response = await axios({
        method: 'post',
        url: `${api}/login`,
        data: params,
        timeout: 5000,
        headers: { 
            'Content-Type': 'application/json' 
        }
    })

    if(response) {
        const api_response = response.data
        console.error(response.data)
        const token = api_response.data.token

        if(api_response.data) {
            if(api_response.data.token) {
                localStorage.setItem('token', token)
                localStorage.setItem('username', params.user_name)
                localStorage.setItem('password', params.password)
                console.log('Login Attempt Response: ', api_response)
                return api_response
            }
        }
        return false
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: HTTPStatusCodes.InternalServerError }
    }
}

export const logout = () => {
    console.log('Deslogado...')
    localStorage.removeItem('token')
}

export const validToken = async() => {
    const token = localStorage.getItem('token')

    const response = await axios({
        method: 'get',
        url: `${api}/self/token`,
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