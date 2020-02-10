import React from 'react'

// Components
import { Component, Container } from '../components/stateless/generic'

// Routing
import { Switch, Route } from 'react-router-native'

// DEMO COMPONENT
import { Text } from 'react-native'
const Home = f => <Container>
	<Text>/ route</Text>
</Container>

// Route maneger class
export default class RouteMan extends Component {

	render() {

		return <Switch>
			<Route component={ Home } />
		</Switch>

	}

}