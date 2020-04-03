import React from 'react'
import { Component, Container, Loading } from '../../stateless/common/generic'
import Navigation from '../../stateful/common/navigation'
import { Login } from '../../stateless/onboarding/login-register'
import { Text, View } from 'react-native'

import { log } from '../../../modules/helpers'

import app from '../../../modules/firebase/app'

export default class LoginRegister extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			action: 'login',
			name: '',
			email: '',
			password: '',
			loading: false
		}
	}

	// Input handler
	onInput = ( key, value ) => this.updateState( { [key]: value } )

	// Log/reg toggle
	toggleAction = f => this.updateState( { action: this.state.action == 'login' ? 'register' : 'login' } )

	// Validate input
	validate = f => {
		const { action, email, password, name } = this.state
		if( !email ) return 'Please fill in your email address'
		if( !password ) return 'Please fill in your password'
		if( action == 'register' && !name ) return 'Please fill in your name'
		return false
	}

	// Handle account/session
	onSubmit = async f => {

		// Validate input
		const missing = this.validate()
		if( missing ) return alert( missing )

		const { action, email, password, name } = this.state

		await this.updateState( { loading: `Best app ${action} ever...` } )

		try {
			if( action == 'login' ) await app.loginUser( email, password )
			if( action == 'register' ) await app.registerUser( name, email, password )
		} catch( e ) {
			log( e )
		}

		await this.updateState( { loading: false } )
	}

	render() {

		const { action, email, password, name, loading } = this.state
		const { history } = this.props

		if( loading ) return <Loading message={ loading } />

		return <Container>
			<Navigation go={ to => history.push( to ) } title={ action } />
			<View style={ { flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch' } }>
				<Login name={ name } email={ email } password={ password } onInput={ this.onInput } proceed={ this.onSubmit } toggle={ this.toggleAction } action={ action } />
			</View>
		</Container>

	}

}