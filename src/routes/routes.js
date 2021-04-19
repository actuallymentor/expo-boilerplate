import React from 'react'
import { BackHandler } from 'react-native'

// Helpers
import { log } from '../modules/helpers'
import { isWeb, dev } from '../modules/apis/platform'

// Redux
import { connect } from 'react-redux'

// Theming
import { Provider as PaperProvider } from 'react-native-paper'

// Firebase
import firebase from '../modules/firebase/app'

// Udates
import { updateIfAvailable } from '../modules/apis/updates'

// Components
import { Loading } from '../components/common/generic'

// Routing
import { Switch, Route, withRouter } from './router'

// Components
import LoginRegistration from '../components/onboarding/login-register'
import UserSettings from '../components/account/user-settings'


// System
import FourOhFour from '../components/common/404'

// Route maneger class
class Routes extends React.Component {

	state = {
		init: false
	}

	componentDidMount = async () => {

		// Handle query strings
		this.handleQueryAndParams()

		const { history, user } = this.props

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

	handleQueryAndParams = async f => {

		// If url is wrongly using hash (for example due to a direct link), fix it
		if( window?.location ) {
			const { href, host } = window.location
			const [ fullMatch, pathMatch ] = href.match( /(\w+)#/ ) || []
			if( pathMatch ) window.history.replaceState( null, '', `/#/${pathMatch}` )
		}

		// Handle purge requests
		if( isWeb && typeof location != 'undefined' && location.href.includes( 'purge' ) ) {
			log( 'Purge request detected' )
			await firebase.logout()
			location.href = '/'
		}

		

	}

	shouldComponentUpdate = async ( nextProps, nextState ) => {

		const { history, user } = nextProps
		const { pathname } = history.location
		
		// Redirect rules, if redirected, do not rerender router
		const wasRedirected = this.handleRedirects( pathname, user )

		// If redirect was triggered, do not rerender as history will trigger it
		if( wasRedirected ) return false

		// Always update by default
		return true

	}

	componentDidUpdate = f => {

		const { history } = this.props
		const { pathname } = history.location


		// Development-only logging of path
		log( 'Current path: ', pathname )

		// Update trigger
		this.scheduleUpdateCheck()

		// Log user screen
		if( pathname && !dev ) firebase.analyticsSetScreen( pathname )


	}

	handleRedirects = ( pathname, user ) => {

		const { history } = this.props

		const noRedir = isWeb && typeof location != 'undefined' && location.href.includes( 'noredir' )

		// Not logged in but not on the home page => go to home
		if( !noRedir && pathname != '/' && !user ) {
			log( 'Redirect: ', `pathname != '/' && !user` )
			history.push( '/' )

			// Signal that a redirect happened
			return true
		}
		// If logged in but at slash => go to profile
		if( !noRedir && pathname == '/' && user ) {
			log( 'Redirect: ', `pathname == '/' && user` )
			history.push( '/home' )

			// Signal that a redirect happened
			return true

		}

		// Signal that no redirect happened
		return false

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
				<Route exact path='/user/settings' component={ UserSettings } />

				{ /* Home */ }
				<Route exact path='/404' component={ FourOhFour } />

				{ /* Home */ }
				<Route exact path='/' component={ LoginRegistration } />

				{ /* Default catcher */ }
				<Route component={ FourOhFour } />

			</Switch> }
		</PaperProvider>

	}

}

export default withRouter( connect( store => ( {
	user: store.user,
	theme: store.settings.theme
} ) )( Routes ) )