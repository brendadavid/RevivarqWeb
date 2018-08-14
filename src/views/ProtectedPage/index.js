import React from 'react'
import { validToken } from 'services/auth/'

class ProtectedPage extends React.Component {
    authenticated = () => {
        return (
            <div>
                <p>Acesso liberado chefia!</p>
            </div>
        )
    }

    unauthenticated = () => {
        return (
            <div>
                <p>Rota Protegida. Afaste-se!</p>
            </div>
        )
    }

	render() {
        if(localStorage.getItem('token')) {
            return this.authenticated()
        } else {
            return this.unauthenticated()
        }
    }
    
    componentWillMount() {
        console.log('Checando Token...')
        validToken(localStorage.getItem('token'), (error, valid) => {
            if(error) {
                console.error(error)
            } else {
                if(valid) {
                    
                } else {
                    localStorage.removeItem('token')
                }
            }
        })
    }
}

export default ProtectedPage 