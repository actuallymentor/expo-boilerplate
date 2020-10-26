import React from 'react'
import { BackHandler } from 'react-native'

// Helpers
import { log } from '../modules/helpers'

// Redux
import { connect } from 'react-redux'

// Theming
import { Provider as PaperProvider } from 'react-native-paper'

// Firebase
import firebase from '../modules/firebase/app'

// Udates
import { updateIfAvailable } from '../modules/apis/updates'

// Components
import { Component, Loading } from '../components/stateless/common/generic'

// Routing
import { Switch, Route, withRouter } from './router'

// Components
import LoginRegistration from '../components/stateful/onboarding/login-register'
import UserSettings from '../components/stateful/account/user-settings'


// System
import FourOhFour from '../components/stateless/common/404'

// Route maneger class
class Routes extends Component {

	state = {
		init: false
	}

	componentDidMount = async () => {

		const { history, user } = this.props

		// If url is wrongly using hash (for example due to a direct link), fix it
		if( window?.location ) {
			const { href, host } = window.location
			const [ fullMatch, pathMatch ] = href.match( /(\w+)#/ ) || []
			if( pathMatch ) window.history.replaceState( null, '', `/#/${pathMatch}` )
		}

		// Register back button handler
		this.backHandler = BackHandler.addEventListener( 'hardwareBackPress', f => {

			// Navigate back
			history.goBack()

			// Stop the event from bubbling up and closing the app
			return true

		} )

		// Set the state to initialised if a user is already in stor
		this.setState( { init: !!user } )

		// Init firebase
		await firebase.init( history )
		
		// Disable loading screen
		return this.setState( { init: true } )
	}

	shouldComponentUpdate = ( nextProps, nextState ) => {

		const { history, user } = nextProps
		const { pathname } = history.location

		// Update trigger
		this.scheduleUpdateCheck()

		// ///////////////////////////////
		// Redirect rules
		// ///////////////////////////////

		// Not logged in but not on the home page => go to home
		if( pathname != '/' && !user ) history.push( '/' )
		// If logged in but at home => go to profile
		if( pathname == '/' && user ) history.push( '/user/settings' )

		// analytics
		if( pathname ) firebase.analytics.setCurrentScreen( pathname ).catch( f => f )

		// On prop or state chang, always update
		return true

	}

	// Schedule an update check
	scheduleUpdateCheck = f => {

		if( this.scheduledUpdateCheck ) {
			clearTimeout( this.scheduledUpdateCheck )
			this.scheduledUpdateCheck = undefined
		}

		// Limit to once every 5 seconds in case they are navigating around
		this.scheduledUpdateCheck = setTimeout( f => {
			log( 'Checking for update...' )
			updateIfAvailable()
		}, 5000 )

	}

	render() {

		const { theme } = this.props
		const { init } = this.state

		{ /* Paper theme provider */ }
		return <PaperProvider theme={ theme }>
			{ !init && <Loading message='Loading your stuff' /> }
			{ /* App router */ }
			{ init && <Switch>

				{ /* Account specific */ }
				<Route path='/user/settings' component={ UserSettings } />

				{ /* Home */ }
				<Route path='/' component={ LoginRegistration } />

				{ /* Home */ }
				<Route path='/404' component={ FourOhFour } />

			</Switch> }
		</PaperProvider>

	}

}

export default withRouter( connect( store => ( {
	user: store.user,
	theme: store.settings.theme
} ) )( Routes ) )