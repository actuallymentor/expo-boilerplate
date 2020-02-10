import React from 'react'

// Components
import { Component, Container } from '../components/stateless/generic'

// Routing
import { NativeRouter, Route } from "react-router-native"

// DEMO COMPONENT
import { Text } from 'react-native'
const Home = f => <Container>
	<Text>/ route</Text>
</Container>

// Route maneger class
export default class RouteMan extends Component {

	render() {

		return <NativeRouter>
			<Route component={ Home } />
		</NativeRouter>

	}

}