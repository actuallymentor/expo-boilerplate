import React from 'react'

// Components
import { Component } from '../components/stateless/generic'

// Routing
import { Switch, Route, AppRouter } from './router'

// DEMO COMPONENT
import Login from '../components/stateless/login'
// Route maneger class
export default class Routes extends Component {

	render() {

		return <AppRouter>
			<Switch>
				<Route component={ Login } />
			</Switch>
		</AppRouter>

	}

}