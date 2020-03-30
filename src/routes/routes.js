import React from 'react'

// Redux
import { connect } from 'react-redux'

// Theming
import { Provider as PaperProvider } from 'react-native-paper'

// Components
import { Component } from '../components/stateless/common/generic'

// Routing
import { Switch, Route, Router, History } from './router'

// Components
import LoginRegistration from '../components/stateful/onboarding/login-register'

// Route maneger class
class Routes extends Component {

	render() {

		const { settings } = this.props

		{ /* Paper theme provider */ }
		return <PaperProvider theme={ settings.theme }>
			{ /* App router */ }
			<Router history={ History }>
				<Switch>
					<Route path='/' component={ LoginRegistration } />
				</Switch>
			</Router>
		</PaperProvider>

	}

}

export default connect( store => ( {
	settings: store.settings
} ) )( Routes )