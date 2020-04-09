import React from 'react'

// Visual
import { Component, Container, Loading } from '../../stateless/common/generic'
import Navigation from '../../stateful/common/navigation'
import { View } from 'react-native'
import { Settings } from '../../stateless/account/user-settings'

// Helpers
import { log, catcher } from '../../../modules/helpers'

// Data
import app from '../../../modules/firebase/app'
import { connect } from 'react-redux'

class UserSettings extends Component {

	constructor( props ) {
		super( props )
		// initialise state
		this.state = {
			loading: false,
			user: props.user,
			settings: props.settings,
			passwordRequired: false
		}
	}

	shouldComponentUpdate = ( nextProps, nextState ) => {

		const { user, settings } = this.props
		const { settings: nextSettings, user: nextUser } = nextProps

		// If redux updated our values
		if( nextSettings != settings ) nextState.settings = nextSettings
		if( nextUser != user ) nextState.user = nextUser

		// Always rerender
		return true
	
	}

	// Sensitive input?
	isSensitive = f => { 

		const { user, passwordRequired } = this.state 
		const { user: oldUser } = this.props

		if( ( user.email != oldUser.email ) || user.newpassword ) return this.updateState( { passwordRequired: true } )

		if( passwordRequired ) return this.updateState( { passwordRequired: false } )

	}

	// Input handlers
	changeUser 		= ( key, value ) => this.updateState( { user: { ...this.state.user, [key]: value } } ).then( this.isSensitive )
	changeSetting 	= ( key, value ) => this.updateState( { settings: { ...this.state.settings, [key]: value } } )

	// Save changes
	saveChanges = async f => {

		const { user, settings } = this.state

		await this.updateState( { loading: true } )

		try {
			await app.updateUser( user )
		} catch( e ) {
			catcher( e )
		} finally {
			await this.updateState( { loading: false, passwordRequired: false } )
		}

	}


	render() {

		const { loading, user, settings, passwordRequired } = this.state

		if( !user || loading ) return <Loading message={ loading } />

		return <Container>
			<Navigation title='User settings' />
			<Settings passwordRequired={ passwordRequired } user={ user } changeUser={ this.changeUser } settings={ settings } changeSetting={ this.changeSetting } saveChanges={ this.saveChanges } />
		</Container>

	}

}

export default connect( store => ( {
	user: store.user,
	settings: store.settings
} ) )( UserSettings )