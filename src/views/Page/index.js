import React from 'react'
import './styles.css'

import { validToken } from 'services/auth/'
import { getRouteConfigs } from 'configs'

import { show_stringify } from 'helpers/json'

// Internal Components
import Header from 'components/Header'

class Page extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            render: undefined,
            isAuthenticated: undefined,
        }
        this.renderBasedOnAuthentication()
    }

    /*
     *  Helpers
     */ 

    redirect = (path) => {
		const {history} = this.props
        history.push(path)
    }

    /*
     *  Triggers
     */

    onAuthenticate = () => {
        const pathname = this.props.history.location.pathname
        const {onAuthenticate} = getRouteConfigs(pathname)
        
        if(onAuthenticate.print_state) console.log(this.state)
        if(onAuthenticate.print_props) console.log(this.props)
    }

    onRender = (config) => {
        let render = []
        
        if(config.show_json_state) render.push(show_stringify( 'State JSON',this.state, 'show_state'))
        if(config.show_json_props) render.push(show_stringify('Props JSON', this.props, 'show_props'))

        return render
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

    header = () => {
        const pathname = this.props.history.location.pathname
        const {header} = getRouteConfigs(pathname)

        return (
            <Header display={header.show}/>
        )
    }

    renderBasedOnAuthentication = async () => {
        try {
            const isAuthenticated = await validToken()
            if(isAuthenticated) {
                await this.setState({render: this.authenticated(), isAuthenticated: true})
            } else {
                await this.setState({render: this.unauthenticated(), isAuthenticated: false})
            }            
            this.onAuthenticate()
            
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        const pathname = this.props.history.location.pathname
        const {onRender} = getRouteConfigs(pathname)

        const {render} = this.state
        
        if(render) {
            return (
                <div>
                    {this.header()}
                    {render}
                    {this.onRender(onRender)}
                </div>
            )
        } else {
            return this.loading()
        }
    }
    
    
}

export default Page    