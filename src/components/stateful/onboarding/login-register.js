import React from 'react'
import { Component, Container, Loading } from '../../stateless/common/generic'
import Navigation from '../../stateful/common/navigation'
import { Login } from '../../stateless/onboarding/login-register'
import { Text, View } from 'react-native'

import { log } from '../../../modules/helpers'

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

	// Handle account/session
	onSubmit = f => {
		const { action, email, password, name } = this.state
		log( [ action, email, password, name ] )
	}

	render() {

		const { action, email, password, name, loading } = this.state

		if( loading ) return <Loading />

		return <Container>
			<Navigation title={ action } />
			<View style={ { flex: 1, justifyContent: 'center' } }>
				<Login name={ name } email={ email } password={ password } onInput={ this.onInput } proceed={ this.onSubmit } toggle={ this.toggleAction } action={ action } />
			</View>
		</Container>

	}

}