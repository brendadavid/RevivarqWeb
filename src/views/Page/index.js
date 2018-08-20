import React from 'react'
import './styles.css'

import { validToken } from 'services/auth/'

// Internal Components
import Header from 'components/Header'

class Page extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            render: undefined,
            headerVisible: true // por padrão mostra o header nas páginas
        }
        this.renderAuthentication()
    }

    /*
     *  Helpers
     */ 

    redirect = (path) => {
		const {history} = this.props
        history.push(path)
    }
    
    toggleHeader() {
        const {headerVisible} = this.state
        this.setState({headerVisible: !headerVisible})
        return this.state.showHeader
    }

    showHeader() {
        this.setState({headerVisible: true})
        return this.state.showHeader
    }

    hideHeader() {
        this.setState({headerVisible: false})
        return this.state.headerVisible
    }

    /*
     *  Views
     */
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

    loading = () => {
        return (
            <div className="container">
                <p>Carregando pagina. Aguarde...</p>
            </div>
        )
    }

    renderAuthentication = async () => {
        try {
            const isAuthenticated = await validToken()
            if(isAuthenticated) {
                await this.setState({render: this.authenticated()})
            } else {
                await this.setState({render: this.unauthenticated()})
            }
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        const {render, headerVisible} = this.state
        if(render) {
            return (
                <div>
                    <Header display={headerVisible}/>
                    {render}
                </div>
            )
        } else {
            return this.loading()
        }
    }
    
    
}

export default Page    