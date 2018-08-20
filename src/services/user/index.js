import axios from 'axios'
import * as crypto from 'crypto-js'
import {api} from 'configs/'
//import * as querystring from 'querystring'

export const create = async (user, encryptPassword) => {
    const params = {
        ...user,
        password: encryptPassword ? crypto.SHA256(user.password).toString() : user.password,
    }
    console.log(params)
    const response = await axios({
        method: 'post',
        url: `${api}/users`,
        data: params,
        timeout: 5000,
        headers: { 
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    if(response) {
        const api_response = response.data
        if(api_response.data) {
            return response.data
        } else {
            return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: 404 }
        }
    }
}