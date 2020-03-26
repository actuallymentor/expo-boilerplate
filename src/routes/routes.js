import React from 'react'

// Components
import { Component } from '../components/stateless/common/generic'

// Routing
import { Switch, Route, AppRouter } from './router'

// Components
import LoginRegistration from '../components/stateful/onboarding/login-register'

// Route maneger class
export default class Routes extends Component {

	render() {

		return <AppRouter>
			<Switch>
				<Route path='/' component={ LoginRegistration } />
			</Switch>
		</AppRouter>

	}

}