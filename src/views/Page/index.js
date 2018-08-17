import React from 'react'
import './styles.css'

import { validToken } from 'services/auth/'

class ProtectedPage extends React.Component {

    redirect = (path) => {
		const {history} = this.props
		history.push(path)
	}

    authenticated = () => {
        return (
            <div className="container">
                <p>Acesso liberado chefia!</p>
            </div>
        )
    }

    unauthenticated = () => {
        return (
            <div className="container">
                <p>Rota Protegida. <a onClick={() => this.redirect('/')} className="clickable">Afaste-se</a>!</p>
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