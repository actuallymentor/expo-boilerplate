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
			settings: props.settings
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

	// Input handlers
	changeUser 		= ( key, value ) => this.updateState( { user: { ...this.state.user, [key]: value } } )
	changeSettings 	= ( key, value ) => this.updateState( { settings: { ...this.state.settings, [key]: value } } )

	// Save changes
	saveChanges = async f => {

		const { user, settings } = this.state

		await this.updateState( { loading: true } )

		try {
			await app.updateUser( user.name, user.avatar )
		} catch( e ) {
			catcher( e )
		} finally {
			await this.updateState( { loading: false } )
		}

	}


	render() {

		const { loading, user, settings } = this.state

		if( loading ) return <Loading message={ loading } />

		return <Container>
			<Navigation title='User settings' />
			<Settings user={ user } changeUser={ this.changeUser } settings={ settings } changeSettings={ this.changeSettings } saveChanges={ this.saveChanges } />
		</Container>

	}

}

export default connect( store => ( {
	user: store.user,
	settings: store.settings
} ) )( UserSettings )