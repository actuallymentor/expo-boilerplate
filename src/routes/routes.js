import React from 'react'

// Redux
import { connect } from 'react-redux'

// Theming
import { Provider as PaperProvider } from 'react-native-paper'

// Firebase
import app from '../modules/firebase/app'

// Components
import { Component, Loading } from '../components/stateless/common/generic'

// Routing
import { Switch, Route, withRouter } from './router'

// Components
import LoginRegistration from '../components/stateful/onboarding/login-register'
import UserSettings from '../components/stateful/account/user-settings'

// Route maneger class
class Routes extends Component {

	state = {
		init: false
	}

	componentDidMount = async () => {
		await app.init()
		return this.setState( { init: true } )
	}

	shouldComponentUpdate = ( nextProps, nextState ) => {

		const { history, user } = nextProps
		const { pathname } = history.location

		// ///////////////////////////////
		// Redirect rules
		// ///////////////////////////////

		// Not logged in but not on the home page => go to home
		if( pathname != '/' && !user ) history.push( '/' )
		// If logged in but at home => go to profile
		if( pathname == '/' && user ) history.push( '/user/settings' )

		// analytics
		if( pathname ) app.analytics.setCurrentScreen( pathname ).catch( f => f )

		// On prop or state chang, always update
		return true

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

			</Switch> }
		</PaperProvider>

	}

}

export default withRouter( connect( store => ( {
	user: store.user,
	theme: store.settings.theme
} ) )( Routes ) )