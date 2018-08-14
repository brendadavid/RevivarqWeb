import axios from 'axios'

export const login = (username, password, callback) => {
    const params = {
        username: username,
        password: password,
    }

    axios({
        method: 'post',
        url: 'http://localhost:4000/fluxoapi/login',
        data: params
    })
    .then( response => {
        const api_response = response.data
        console.log(api_response)
        if(api_response.data) {
            if(api_response.data.token) {
                localStorage.setItem('token', api_response.data.token)
                callback(null, response.data)
                return true
            }
        }
        callback({ data: 'Error'}, null)
        return false
    })
    .catch( error => {
        callback(error, null)
        return false
    })
}