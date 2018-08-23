import axios from 'axios'
import * as crypto from 'crypto-js'
import { crud_user } from 'configs/api_routes'
import { Constants } from 'configs/constants';
import * as querystring from 'query-string';


export const create = async (user, encryptPassword) => {
    let route = crud_user.create()

    const params = {
        ...user,
        password: encryptPassword ? crypto.SHA256(user.password).toString() : user.password,
    }
    const response = await axios({
        method: route.method,
        url: route.url,
        data: params,
        timeout: 5000,
        headers: { 
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    if(response) {
        const api_response = response.data
        if(api_response.data) {
            return response.data
        } else {
            return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
        }
    }
}

export const read = async (id) => {
    let route = crud_user.read(id)

    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        headers: { 
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    if(response) {
        const api_response = response.data
        return api_response.data
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
    }
}

export const update = async (user, encryptPassword) => {
    let route = crud_user.update()

    const params = {
        ...user,
        password: encryptPassword ? crypto.SHA256(user.password).toString() : user.password,
    }

    delete params.password // Backend por padrão não atualiza senha no update.

    const response = await axios({
        method: route.method,
        url: route.url,
        data: params,
        timeout: 5000,
        headers: { 
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    if(response) {
        const api_response = response.data
        if(api_response.data) {
            return response.data
        } else {
            return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
        }
    }
}

export const list = async (contains, sort, isAscending) => {
    const queryParams = querystring.stringify({
        contains: contains,
        sort: sort,
        isAscending: isAscending
    })

    let route = crud_user.list()

    // console.warn(`${route.url}?${queryParams}`)
    
    const response = await axios({
        method: route.method,
        url: `${route.url}?${queryParams}`,
        timeout: 5000,
        headers: { 
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    if(response) {
        const api_response = response.data
        return api_response
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
    }
}